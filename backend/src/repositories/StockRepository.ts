import { IStockRepository } from "../interface/repositories/IStockRepository.interface";
import { stockDetailsOutput } from "../interface/repositories/stockRepository.types";
import StockModel from "../models/Stock";

export class StockRepository implements IStockRepository {
    getStockPrice = async (symbol: string, date: String): Promise<stockDetailsOutput> => {
        const stockSymbol = await StockModel.findOne({ symbol: symbol.toUpperCase() });
        if(!stockSymbol){
            throw new Error(`Stock symbol '${symbol}' not found`); 
        }
        const stock = await StockModel.findOne({ symbol: symbol.toUpperCase(), date });
        if (!stock) {
            throw new Error(`No data available for '${symbol}' on ${date}`); 
        }
        return { closingPrice: stock?.closing_price ?? null };
    }

}
