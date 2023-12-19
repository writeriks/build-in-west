import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import authenticationService from "../../service/authentication-service.ts/authentication-service";
import StockTable from "../../componenets/stocks-table/stock-table";

import { createTRPCContext } from "../../server/api/trpc";
import { appRouter } from "../../server/api/root";

import { type Stock } from "../../types/stock-types";
import { type NextApiRequest, type NextApiResponse } from "next";
import { type User } from "@prisma/client";

const MyPortfolio = ({
  dbUser,
  stocks: stockData,
}: {
  dbUser: User;
  stocks: Record<string, Stock>;
}) => {
  console.log("🚀 ~ file: index.tsx:19 ~ dbUser:", dbUser);

  const tableHeaders = ["Symbol - Name", "Price", "Change %"];

  return (
    <div className="flex h-[calc(100vh-60px)] w-screen flex-col">
      <div className="h-16 h-full w-full bg-yellow-500 p-4">
        <h1>My Portfolio</h1>
        <div className="flex w-full flex-row justify-center">
          <div className="w-full md:w-[70%]">
            <StockTable
              data={Object.values(stockData)}
              headers={tableHeaders}
              isEditable
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { req, res } = context;

    // A way to call trpc methods from the server
    const ctx = createTRPCContext({
      req: req as NextApiRequest,
      res: res as NextApiResponse,
    });
    const trpc = appRouter.createCaller(ctx);
    const stocks = await trpc.stocks.getStocks();

    const dbUser = await authenticationService.getUserWithSession(req, res);
    return {
      props: {
        dbUser: JSON.parse(JSON.stringify(dbUser)) as User,
        stocks: stocks,
      },
    };
  },
});

export default MyPortfolio;
