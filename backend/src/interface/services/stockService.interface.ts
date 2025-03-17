import { stockDetailsOutput } from "./stockService.types";

export interface IStockService {
  getStockPrice(data: { symbol: string; date: string }): Promise<stockDetailsOutput>;
}
