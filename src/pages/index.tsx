// src/pages/index.tsx
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { BlogPost } from '../types/blog';
import { getAllPosts } from '../utils/posts'

interface HomeProps {
  posts: BlogPost[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
       
    <p><span className="askii">..</span>_________ </p> 
    <p><span className="askii">.</span>/ /_||_|_\\  <span className="askii">..</span> \o  <span className="askii">....</span> o/  </p> 
    <p>( <span className="askii">...</span>_  <span className="askii">..</span>_ _\<span className="askii">...</span> |\ o/ /|  </p>
    <p><span className="askii">.</span>=`(_)---(_)-`<span className="askii">.</span> / \ /\ / \  </p>

   <p>
   <span className="askii">...........</span> Calvin Arthur Eileen
   </p>
   


<p>
            The Jubilees are on the move! Welcome to our home on the internet.
          </p>
        </header>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link 
                href={`/posts/${post.slug}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600">
                      {post.title}
                    </h2>
                  </div>
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  
  return {
    props: {
      posts,
    },
  };
};