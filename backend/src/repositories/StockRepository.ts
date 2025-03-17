import { IStockRepository } from "../interface/repositories/IStockRepository.interface";
import { stockDetailsOutput } from "../interface/repositories/stockRepository.types";
import StockModel from "../models/Stock";

export class StockRepository implements IStockRepository {
    getStockPrice = async (symbol: string, date: String): Promise<stockDetailsOutput> =>{
        const stock = await StockModel.findOne({ symbol, date });
        console.log(stock)
        return { closingPrice: stock?.closing_price ?? null };
    }

}
