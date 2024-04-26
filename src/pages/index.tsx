import { useEffect } from "react";

import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import useSetAdminUser from "../hooks/use-set-admin-user";

import authenticationService from "../service/authentication-service.ts/authentication-service";
import { type User } from "@prisma/client";

export const Home = ({ dbUser }: { dbUser: User }) => {
  const router = useRouter();

  useSetAdminUser(dbUser);

  useEffect(() => {
    const pushToPortfolio = async () => {
      await router.push("/my-finance");
    };
    void pushToPortfolio();
  }, [router]);
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const dbUser = await authenticationService.getUserWithSession(req, res);
    return {
      props: { dbUser: JSON.parse(JSON.stringify(dbUser)) as User },
    };
  },
});

export default Home;
