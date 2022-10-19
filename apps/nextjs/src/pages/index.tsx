import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import type { inferProcedureOutput } from "@trpc/server";
import type { AppRouter } from "@captain/trpc";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
}> = ({ post }) => {
  return (
    <div className="p-4 border-2 border-gray-500 rounded-lg max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800">{post.id}</h2>
      <p className="text-gray-600">{post.body}</p>
    </div>
  );
};

const Home: NextPage = () => {
  const postQuery = trpc.post.all.useQuery();

  return (
    <>
      <Head>
        <title>Captain (by Ping.gg)</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col items-center min-h-screen py-16 mx-auto">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Captain by <a href="https://ping.gg">Ping.gg</a>
        </h1>
        <div className="flex items-center justify-center w-full pt-6 text-2xl text-blue-500">
          {postQuery.data ? (
            <div className="flex flex-col gap-4">
              {postQuery.data?.map((p) => {
                return <PostCard key={p.id} post={p} />;
              })}
            </div>
          ) : (
            <p>Loading..</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
