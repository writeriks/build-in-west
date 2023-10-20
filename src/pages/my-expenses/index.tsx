import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { type User } from "@prisma/client";
import React from "react";
import authenticationService from "../../service/authentication-service.ts/authentication-service";

const MyExpenses = ({ dbUser }: { dbUser: User }) => {
  console.log("🚀 ~ file: index.tsx:6 ~ MyExpenses ~ dbUser:", dbUser);
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="h-16 h-full w-full bg-yellow-500">Content</div>
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

export default MyExpenses;
