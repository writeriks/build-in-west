import { useUser } from "@auth0/nextjs-auth0/client";
import Head from "next/head";

export default function Home() {
  const { user, error, isLoading } = useUser();
  console.log("🚀 ~ file: index.tsx:6 ~ Home ~ isLoading:", isLoading);
  console.log("🚀 ~ file: index.tsx:6 ~ Home ~ error:", error);
  console.log("🚀 ~ file: index.tsx:6 ~ Home ~ user:", user);

  return (
    <>
      <Head>
        <title>BuildInWest</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {user?.email ? (
          <a className="text-white" href="/api/auth/logout">
            Logout
          </a>
        ) : (
          <a className="text-white" href="/api/auth/login">
            Login
          </a>
        )}
      </main>
    </>
  );
}
