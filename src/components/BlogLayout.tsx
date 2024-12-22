import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPost {
  title: string;
  date: string;
  content: string;
  slug: string;
}

interface Props {
  posts: BlogPost[];
}

const BlogLayout: React.FC<Props> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Sort posts by date
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!selectedPost ? (
        <>
          <h1 className="text-4xl font-bold mb-8">My Blog</h1>
          <div className="space-y-6">
            {sortedPosts.map((post) => (
              <article 
                key={post.slug}
                className="border-b pb-6 cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <h2 className="text-2xl font-semibold hover:text-blue-600">
                  {post.title}
                </h2>
                <time className="text-gray-500 text-sm">
                  {new Date(post.date).toLocaleDateString()}
                </time>
              </article>
            ))}
          </div>
        </>
      ) : (
        <div className="prose max-w-none">
          <button
            onClick={() => setSelectedPost(null)}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← Back to posts
          </button>
          <h1>{selectedPost.title}</h1>
          <time className="text-gray-500 block mb-8">
            {new Date(selectedPost.date).toLocaleDateString()}
          </time>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {selectedPost.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default BlogLayout;