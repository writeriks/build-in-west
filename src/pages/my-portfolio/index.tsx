import React, { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

import { useDispatch, useSelector } from "react-redux";

import AddStockDialog from "../../components/add-stocks-dialog/add-stocks-dialog";
import DataTable from "../../components/data-table/data-table";

import authenticationService from "../../service/authentication-service.ts/authentication-service";
import { stockTableColumnDef } from "../../components/stock-table-column-def/stock-table-column-def";
import { api } from "../../utils/api";
import uiReducerSelector from "../../store/reducers/ui-reducer/ui-reducer-selector";
import { setShouldRefetchUserStocks } from "../../store/reducers/ui-reducer/ui-slice";

import { type User } from "@prisma/client";
import { type Stock } from "../../types/stock-types";
import useProcessedStocks from "../../hooks/use-processed-stocks";

const MyPortfolio = ({
  dbUser,
  isMobileOS,
}: {
  dbUser: User;
  isMobileOS: boolean;
}) => {
  const [stocksArray, setStocksArray] = React.useState<Stock[]>([]);
  const [loadingStocks, setLoadingStocks] = React.useState<boolean>(true);

  const dispatch = useDispatch();

  const shouldRefetchUserStocks = useSelector(
    uiReducerSelector.getShouldRefetchUserStocks
  );

  const {
    data: stocks,
    isRefetching: stocksRefetching,
    error,
    refetch: refetchStocks,
  } = api.stocks.getStocks.useQuery(
    {
      userId: dbUser.id,
    },
    { enabled: shouldRefetchUserStocks }
  );
  const { data: userStocks, refetch: refetchUserStocks } =
    api.stocks.getUserStocks.useQuery(
      {
        userId: dbUser.id,
      },
      { enabled: shouldRefetchUserStocks }
    );

  const sortUserStockOrder = api.stocks.sortUserStocks.useMutation();

  useEffect(() => {
    dispatch(setShouldRefetchUserStocks(true));
  }, [dispatch]);

  useEffect(() => {
    const fetchUserStocks = async () => {
      await refetchStocks();
      await refetchUserStocks();
      dispatch(setShouldRefetchUserStocks(false));
    };
    if (shouldRefetchUserStocks) {
      void fetchUserStocks();
    }
  }, [shouldRefetchUserStocks, refetchUserStocks, dispatch, refetchStocks]);

  useProcessedStocks(setLoadingStocks, setStocksArray, userStocks, stocks);

  const handleSortingOver = async (sortedArray: Stock[]) => {
    const stockOrder = sortedArray.map((stock) => stock.symbol);

    await sortUserStockOrder.mutateAsync({
      userId: dbUser.id,
      symbols: stockOrder,
    });
  };

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex h-[calc(100vh-60px)] flex-col">
      <div className="h-full w-full bg-yellow-400 p-4">
        <div className="flex w-full flex-row justify-center">
          <div className="w-full md:w-[70%]">
            <AddStockDialog stocks={stocks ? Object.values(stocks) : []} />
            <div>
              <DataTable
                data={stocksArray}
                setDataOnDragEnd={(array) => setStocksArray(array)}
                columnDef={stockTableColumnDef()}
                handleSortingOver={(array) =>
                  handleSortingOver(array as Stock[])
                }
                pageSize={isMobileOS ? 5 : 8}
                filtersEnabled
                sortingEnabled
                isLoading={loadingStocks || stocksRefetching}
              />
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
        isMobileOS: isMobile,
      },
    };
  },
});

export default MyPortfolio;
