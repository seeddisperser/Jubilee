// For the frontmatter metadata in markdown files
export interface BlogPostFrontmatter {
  // Required fields
  title: string;
  date: string;
  description: string;
  
  // Optional fields
  tags?: string[];
  author?: string;
  coverImage?: string;
  draft?: boolean;
  featured?: boolean;
  readingTime?: string;
}

// For the fully processed blog post
export interface BlogPost extends BlogPostFrontmatter {
  // Content from the markdown file
  content: string;
  
  // Generated fields
  slug: string;
  excerpt?: string;
  
  // Computed dates
  lastModified?: string;
  formattedDate?: string;
}

// For API responses
export interface BlogPostResponse {
  post: BlogPost;
  previousPost?: Pick<BlogPost, 'title' | 'slug' | 'date'>;
  nextPost?: Pick<BlogPost, 'title' | 'slug' | 'date'>;
}

// Email Signup
export interface EmailSignupProps {
  email: string;
  status: string;
  onSubmit?: string;
}

//Rsvp
export interface RsvpProps {
  name: string;
  status: string;
  onSubmit?: string;
}

// For listing/preview purposes
export type BlogPostPreview = Pick<BlogPost, 
  'title' | 
  'date' | 
  'description' | 
  'slug' | 
  'tags' | 
  'coverImage' | 
  'excerpt' |
  'readingTime'
>;


