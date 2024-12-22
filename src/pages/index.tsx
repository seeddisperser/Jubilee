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
          <h1 className="text-4xl font-bold mb-4">Jubil.ee</h1>
       
    <p><span class="askii">..</span>_________ </p> 
    <p><span class="askii">.</span>/ /_||_|_\\  <span class="askii">..</span> \o  <span class="askii">....</span> o/  </p> 
    <p>( <span class="askii">...</span>_  <span class="askii">..</span>_ _\<span class="askii">...</span> |\ o/ /|  </p>
    <p><span class="askii">.</span>=`(_)---(_)-'<span class="askii">.</span> / \ /\ / \  </p>

   <p>
   <span class="askii">...........</span> Calvin Arthur Eileen
   </p>
   


<p>
            The Jubilee's are on the move! Welcome to our home on the internet.
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