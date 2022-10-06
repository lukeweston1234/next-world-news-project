import Map from "../components/Map";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";

function App({ posts }: { posts: Array<any> }) {
  return (
    <>
      <Head>
        <title>World News Map</title>
      </Head>

      <Map posts={posts} />
    </>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const posts = await prisma.posts.findMany();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default App;
