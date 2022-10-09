import React, { useState } from "react";
import Map from "../components/Map";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";

function App({ posts }: { posts: Array<any> }) {
  const [canShow, setCanShow] = useState(true);

  return (
    <div className="grid grid-rows-9">
      <Head>
        <title>World News Map</title>
      </Head>
      <Sidebar canShow={canShow} setCanShow={setCanShow} />
      <Map posts={posts} setCanShow={setCanShow} />
    </div>
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
