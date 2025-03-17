import { IStockRepository } from "../interface/repositories/IStockRepository.interface";
import { stockDetailsOutput } from "../interface/repositories/stockRepository.types";
import StockModel from "../models/Stock";

export class StockRepository implements IStockRepository {
    getStockPrice = async (symbol: string, date: Date): Promise<stockDetailsOutput> =>{
        console.log('ss'+symbol);
        console.log('sss'+date);
        const stock = await StockModel.findOne({ symbol, date });
        console.log(stock)
        return { price: stock?.closing_price ?? null };
    }

}
