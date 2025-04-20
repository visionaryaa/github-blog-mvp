import Link from 'next/link';
import { PostData } from '../lib/posts';

export default function PostList({ posts }: { posts: PostData[] }) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="mt-4 text-gray-600">No posts found. Create your first post in the admin section.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 mb-2">{post.date}</p>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}