import { type Stock } from "../../types/stock-types";

class StockService {
  generateStocks(table: HTMLTableSectionElement): Record<string, Stock> {
    const stocksArray = this.generatStocksArrayFromHTMLTable(table);
    const stocksDataObject =
      this.convertStockArrayToStockDataObject(stocksArray);

    return stocksDataObject;
  }

  generatStocksArrayFromHTMLTable(table: HTMLTableSectionElement): Stock[] {
    const stocksArray: Stock[] = [];
    const rows = table.querySelectorAll("tr");

    rows.forEach((row) => {
      const rowData: string[] = [];
      const columns = row.querySelectorAll("td");

      columns.forEach((column) => {
        if (column.textContent === null) {
          throw new Error("Column text content is null");
        }
        rowData.push(column.textContent.trim());
      });

      stocksArray.push({
        id: rowData[0]!.split(" ")[0]!,
        symbol: rowData[0]!.split(" ")[0]!,
        name: rowData[0]!.split(" ").splice(1)!.join(" ")!,
        lastPrice: rowData[2]!,
        change: rowData[3]!,
        volume: rowData[4]!,
        lastUpdate: rowData[5]!,
      });
    });

    return stocksArray;
  }

  convertStockArrayToStockDataObject(
    stocksArray: Stock[]
  ): Record<string, Stock> {
    const stocksDataObject: Record<string, Stock> = {};

    stocksArray.forEach((stock) => {
      stocksDataObject[stock.symbol] = stock;
    });

    return stocksDataObject;
  }
}

const stockService = new StockService();
export default stockService;
