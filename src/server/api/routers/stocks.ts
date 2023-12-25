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

      if (!stock) {
        stock = await ctx.prisma.stock.create({
          data: {
            symbol: stockSymbol,
          },
        });
      }

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
    }),
});
