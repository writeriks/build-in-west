import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { useRouter } from "next/router";
import { useEffect } from "react";

export const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const pushToPortfolio = async () => {
      await router.push("/my-portfolio");
    };
    void pushToPortfolio();
  }, [router]);
};

export const getServerSideProps = withPageAuthRequired();

export default Home;
