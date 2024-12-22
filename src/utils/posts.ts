// src/utils/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  slug: string;
}

export interface RawBlogPost extends Omit<BlogPost, 'slug'> {
  draft?: boolean;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(options = { includeDrafts: false }): BlogPost[] {
  // Ensure the posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found:', postsDirectory);
    return [];
  }

  try {
    // Get all .md files from the posts directory
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName): BlogPost | null => {
        try {
          // Remove ".md" from file name to get id
          const slug = fileName.replace(/\.md$/, '');
          
          // Read markdown file as string
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          
          // Use gray-matter to parse the post metadata section
          const { data, content } = matter(fileContents);
          
          // Validate the post data
          const post = data as RawBlogPost;
          
          // Skip draft posts in production unless includeDrafts is true
          if (post.draft && !options.includeDrafts) {
            return null;
          }
          
          // Validate required fields
          if (!post.title || !post.date || !post.description) {
            console.warn(`Missing required fields in ${fileName}`);
            return null;
          }
          
          // Ensure tags is an array
          const tags = Array.isArray(post.tags) ? post.tags : [];
          
          // Parse the date and validate it
          const date = new Date(post.date);
          if (isNaN(date.getTime())) {
            console.warn(`Invalid date in ${fileName}`);
            return null;
          }
          
          return {
            ...post,
            date: date.toISOString(),
            tags,
            content,
            slug,
          };
        } catch (error) {
          console.error(`Error processing ${fileName}:`, error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);

    // Sort posts by date (newest first)
    return allPosts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const post = data as RawBlogPost;
    
    // Validate required fields
    if (!post.title || !post.date || !post.description) {
      console.warn(`Missing required fields in ${slug}.md`);
      return null;
    }
    
    return {
      ...post,
      date: new Date(post.date).toISOString(),
      tags: Array.isArray(post.tags) ? post.tags : [],
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}