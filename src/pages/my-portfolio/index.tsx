import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import authenticationService from "../../service/authentication-service.ts/authentication-service";
import StockTable from "../../componenets/stocks-table/stock-table";

import { type User } from "@prisma/client";
import StocksModal from "../../componenets/stocks-modal/stocks-modal";
import { api } from "../../utils/api";
import Loading from "../../componenets/common/loading/loading";

const MyPortfolio = ({ dbUser }: { dbUser: User }) => {
  console.log("🚀 ~ file: index.tsx:19 ~ dbUser:", dbUser);

  const { data: stockData, isLoading, error } = api.stocks.getStocks.useQuery();
  const [isModal, setIsModal] = useState(false);
  const componentToRender = () => {
    if (isLoading) {
      return <Loading />;
    } else if (error) {
      return <div>{error.message}</div>;
    } else {
      return (
        <div className="flex w-full flex-row justify-center">
          <div className="w-full md:w-[70%]">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
              onClick={() => setIsModal(!isModal)}
            >
              Add Stock
            </button>
            <StockTable data={Object.values(stockData)} isEditable />
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-[calc(100vh-60px)] w-screen flex-col">
      <div className="h-16 h-full w-full bg-yellow-500 p-4">
        <h1>My Portfolio</h1>
        {isModal ? <StocksModal isModal setIsModal={setIsModal} /> : null}
        {componentToRender()}
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const { req, res } = context;

    // A way to call trpc methods from the server
    /* const ctx = createTRPCContext({
      req: req as NextApiRequest,
      res: res as NextApiResponse,
    });
    const trpc = appRouter.createCaller(ctx);
    const stocks = await trpc.stocks.getStocks(); */

    const dbUser = await authenticationService.getUserWithSession(req, res);
    return {
      props: {
        dbUser: JSON.parse(JSON.stringify(dbUser)) as User,
      },
    };
  },
});

export default MyPortfolio;
