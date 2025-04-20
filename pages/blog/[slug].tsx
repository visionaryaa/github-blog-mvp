import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData, PostData } from '../../lib/posts';

interface PostProps {
  postData: PostData;
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout title={postData.title}>
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{postData.title}</h1>
        <div className="text-gray-500 mb-8">{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const postData = await getPostData(slug);
  return {
    props: {
      postData,
    },
  };
};