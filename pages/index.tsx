import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { getSortedPostsData, PostData } from '../lib/posts';

interface HomeProps {
  posts: PostData[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout title="GitHub Blog - Home">
      <PostList posts={posts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = getSortedPostsData();
  return {
    props: {
      posts,
    },
  };
}