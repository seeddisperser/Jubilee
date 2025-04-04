import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../../types/blog';
import { getAllPosts, getPostBySlug } from '../../utils/posts';
import EmailSignup from '@/src/components/EmailSignup';

interface PostProps {
  post: BlogPost;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export default function Post({ post }: PostProps) {
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Home
        </Link>
      </div>
    );
  }

  return (
    <div className="blog">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          ← Home
        </Link>
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between mb-4">
            <time className="text-gray-600">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <div>
            <h3>Stay in touch</h3>
            <p>Welcome to our blog, your best source of information about the Jubilees. Stay tuned for updates, and sign up for our mailing list.</p>
            <EmailSignup />
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        <div>
            <EmailSignup />
        </div>
      </article>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false, // Return 404 for non-existent slugs
  };
};

export const getStaticProps: GetStaticProps<PostProps, Params> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};