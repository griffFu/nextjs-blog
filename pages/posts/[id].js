//imports
import { headders } from "next/dist/client/components/headers";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";

// this gives us access to the data for the provided path that has been selected
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

/* static paths for the different blog posts, we need to know what all of the options are in order to 
pre-render them here
*/
export async function getStaticPaths() {
  // an array of objects is returned in very specific format (e.g. check get allPostsIds function)
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

//react components
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}
