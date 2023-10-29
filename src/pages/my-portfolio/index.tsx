import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { type User } from "@prisma/client";
import { api } from "../../utils/api";
import authenticationService from "../../service/authentication-service.ts/authentication-service";
import Table from "../../componenets/common/table/table";

const MyPortfolio = ({ dbUser }: { dbUser: User }) => {
  console.log("🚀 ~ file: index.tsx:6 ~ MyPortfolio ~ dbUser:", dbUser);
  const { data: stockData } = api.stocks.getStocks.useQuery();
  console.log("🚀 ~ file: index.tsx:11 ~ Home ~ stockData:", stockData);

  return (
    <div className="flex h-[calc(100vh-60px)] w-screen flex-col">
      <div className="h-16 h-full w-full bg-yellow-500 p-4">
        <h1>My Portfolio</h1>
        <Table />
      </div>
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

export default MyPortfolio;
