export interface Stock {
  symbol: string;
  name: string;
  lastPrice: number;
  averageCost?: number;
  profit?: number;
  profitPercentage?: number;
  quantity?: number;
  volume: string;
  lastUpdate: string;
  change: string;
  id: string;
  isFavorite: boolean;
}

export type StockData = Record<string, Stock>;
