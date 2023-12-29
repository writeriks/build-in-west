import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import useSession from "../../hooks/useSession";

import StocksModal from "../../components/stocks-modal/stocks-modal";
import Loading from "../../components/common/loading/loading";
import { Button } from "../../components/ui/button";
import DataTable from "../../components/data-table/data-table";

import authenticationService from "../../service/authentication-service.ts/authentication-service";
import { stockTableColumnDef } from "../../components/stock-table-column-def/stock-table-column-def";
import { api } from "../../utils/api";

import { type User } from "@prisma/client";

const MyPortfolio = ({
  dbUser,
  isMobile,
}: {
  dbUser: User;
  isMobile: boolean;
}) => {
  const [isModal, setIsModal] = useState(false);
  const session = useSession();

  const { data, isLoading, error } = api.stocks.getStocks.useQuery({
    userId: session ? session?.id : "",
  });

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <div className="h-full w-full bg-yellow-400 p-4">
        {isModal ? <StocksModal isModal setIsModal={setIsModal} /> : null}

        <div className="flex w-full flex-row justify-center">
          <div className="w-full md:w-[70%]">
            <Button variant="outline" onClick={() => setIsModal(!isModal)}>
              Add Stock
            </Button>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <DataTable
                  data={Object.values(data)}
                  columnDef={stockTableColumnDef(isMobile)}
                  pageSize={5}
                  filtersEnabled
                  sortingEnabled
                />
              )}
            </div>
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
    /* const ctx = createTRPCContext({
      req: req as NextApiRequest,
      res: res as NextApiResponse,
    });
    const trpc = appRouter.createCaller(ctx);
    const stocks = await trpc.stocks.getStocks(); */

    const dbUser = await authenticationService.getUserWithSession(req, res);
    const isMobile =
      context?.req?.headers["user-agent"]?.includes("iPhone") ??
      context?.req?.headers["user-agent"]?.includes("iPhone");

    return {
      props: {
        dbUser: JSON.parse(JSON.stringify(dbUser)) as User,
        isMobile: isMobile,
      },
    };
  },
});

export default MyPortfolio;
