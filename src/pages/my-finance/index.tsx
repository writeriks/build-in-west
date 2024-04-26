import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { type User } from "@prisma/client";
import authenticationService from "../../service/authentication-service.ts/authentication-service";

import useSetAdminUser from "../../hooks/use-set-admin-user";

const MyFinance = ({ dbUser }: { dbUser: User }) => {
  useSetAdminUser(dbUser);

  return (
    <div className="flex h-[calc(100vh-60px)] w-screen flex-col">
      <div className=" h-full w-full bg-yellow-400">Content</div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const dbUser = await authenticationService.getUserWithSession(req, res);
    return {
      props: { dbUser: JSON.parse(JSON.stringify(dbUser)) as User },
    };
  },
});

export default MyFinance;
