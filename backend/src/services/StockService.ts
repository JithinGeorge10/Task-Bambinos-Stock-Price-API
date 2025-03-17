import { IStockRepository } from "../interface/repositories/IStockRepository.interface";
import { IStockService } from "../interface/services/stockService.interface";
import {
    stockDetailsInput,
    stockDetailsOutput
} from "../interface/services/stockService.types";
export class StockService implements IStockService {
    private stockRepository: IStockRepository;

    constructor(stockRepository: IStockRepository) {
        this.stockRepository = stockRepository;
    }

    getStockPrice = async ({ symbol, date }: { symbol: string; date: string }): Promise<stockDetailsOutput> => {
        try {
            const stockDetails = await this.stockRepository.getStockPrice(symbol, new Date(date));  // Ensure date is converted to Date object
            return { price: stockDetails.price };
        } catch (error: any) {
            console.log("Error in stock service", error.message);
            throw new Error(error.message);
        }
    };
    
}
