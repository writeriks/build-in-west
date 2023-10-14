import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { JSDOM } from "jsdom";
import stockService from "../../../service/stock-service/stock-service";

const stocksUrl = "https://finans.mynet.com/borsa/hisseler/";

export const stocksRouter = createTRPCRouter({
  getStocks: publicProcedure.query(async () => {
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

      return stockService.generateStocks(tbodyElement);
    } catch (error) {
      throw new Error(
        "Error fetching and extracting table data:",
        error as Error
      );
    }
  }),
});
