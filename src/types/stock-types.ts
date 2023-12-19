export interface Stock {
  symbol: string;
  name: string;
  lastPrice: string;
  volume: string;
  lastUpdate: string;
  change: string;
  id: string;
}

export type StockData = Record<string, Stock>;
