import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { JSDOM } from "jsdom";
import stockService from "../../../service/stock-service/stock-service";
import { z } from "zod";
import { type UserStock } from "@prisma/client";

const stocksUrl = "https://finans.mynet.com/borsa/hisseler/";

export const stocksRouter = createTRPCRouter({
  getStocks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const response = await fetch(stocksUrl);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const html = await response.text();

        // Create a DOM instance using jsdom
        const { window } = new JSDOM(html);
        const document = window.document;

        // Access the <tbody> element
        const tbodyElement = document.querySelector("tbody");

        if (!tbodyElement) {
          throw new Error("<tbody> element not found in the HTML");
        }

        // Get the user stocks from the database
        const userStocks: UserStock[] = await ctx.prisma.userStock.findMany({
          where: {
            userId: input.userId,
          },
        });
        if (!userStocks) {
          throw new Error("User not found");
        }

        return stockService.generateStocks(tbodyElement, userStocks);
      } catch (error) {
        throw new Error(
          "Error fetching and extracting table data:",
          error as Error
        );
      }
    }),

  addUserStocksToWatchList: publicProcedure
    .input(
      z.object({
        stockSymbol: z.string(),
        stockName: z.string(),
        userId: z.string(),
        quantitiy: z.number(),
        buyPrice: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { buyPrice, quantitiy, stockSymbol, stockName, userId } = input;

      const owner = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      let stock;
      stock = await ctx.prisma.stock.findFirst({
        where: {
          symbol: stockSymbol,
        },
      });

      // If the stock does not exist in the database, create it
      if (!stock) {
        stock = await ctx.prisma.stock.create({
          data: {
            symbol: stockSymbol,
          },
        });
      }

      const existingUserStock = await ctx.prisma.userStock.findFirst({
        where: {
          symbol: stockSymbol,
          userId: userId,
        },
      });

      if (existingUserStock) {
        await ctx.prisma.userStock.update({
          where: {
            id: existingUserStock?.id,
          },
          data: {
            buyPrice:
              (existingUserStock?.buyPrice * existingUserStock.quantity +
                buyPrice * quantitiy) /
              (existingUserStock.quantity + quantitiy),
            quantity: existingUserStock.quantity + quantitiy,
          },
        });
      } else {
        await ctx.prisma.userStock.create({
          data: {
            buyPrice: buyPrice,
            quantity: quantitiy,
            symbol: stockSymbol,
            name: stockName,
            stock: {
              connect: {
                id: stock?.id,
              },
            },
            user: {
              connect: {
                id: owner?.id,
              },
            },
          },
        });

        // Update the user's stocks order
        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            userStocksOrder: `${stockSymbol},${
              owner?.userStocksOrder ? owner?.userStocksOrder : ""
            }`,
          },
        });
      }
    }),

  removeUserStocksToWatchList: publicProcedure
    .input(
      z.object({
        symbol: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { symbol, userId } = input;

      const stockToDelete = await ctx.prisma.userStock.findFirst({
        where: {
          symbol: symbol,
          userId: userId,
        },
      });

      await ctx.prisma.userStock.delete({
        where: {
          id: stockToDelete?.id,
        },
      });

      const stockOrder = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      const newStockOrder = stockOrder?.userStocksOrder
        ?.replace(symbol, "")
        .replace(",,", ",")
        .replace(/(^,)|(,$)/g, "");

      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userStocksOrder: newStockOrder,
        },
      });
    }),

  getUserStocks: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const symbolsOrder: string[] = user.userStocksOrder.split(",");

      const userStocks = await ctx.prisma.userStock.findMany({
        where: {
          userId: userId,
        },
      });

      // Create a map to store user stocks indexed by symbol for quick lookup
      const userStocksMap = new Map(
        userStocks.map((stock) => [stock.symbol, stock])
      );

      // Reorder the user stocks array based on the order of input symbols
      const reorderedUserStocks = symbolsOrder
        .map((symbol) => userStocksMap.get(symbol))
        .filter(Boolean);

      return reorderedUserStocks;
    }),

  sortUserStocks: publicProcedure
    .input(
      z.object({
        symbols: z.array(z.string()),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { symbols, userId } = input;

      const newStockOrder = symbols.join(",");

      await ctx.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          userStocksOrder: newStockOrder,
        },
      });
    }),
});
