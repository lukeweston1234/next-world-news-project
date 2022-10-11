import React, { useState } from "react";
import Map from "../components/Map";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";

function App({ posts }: { posts: Array<any> }) {
  return (
    <div>
      <Head>
        <title>World News Map</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Map posts={posts} />
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const posts = await prisma.location.findMany({
    include: {
      posts: true,
    },
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
    revalidate: 300,
  };
}

export default App;
