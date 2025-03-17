import { Request } from "express";
import { IStockController } from "../interface/controllers/stockController.interface";
import { ControllerResponse } from "../interface/controllers/stockController.types";
import { IStockService } from "../interface/services/stockService.interface";



export class StockController implements IStockController {
  private stockService: IStockService;

  constructor(stockService: IStockService) {
    this.stockService = stockService
  }


  stockClosingPrice = async (httpRequest: Request): Promise<ControllerResponse> => {
    try {
      const symbol = httpRequest.query.symbol as string;
      const dateFromQuery = httpRequest.query.date as string;
      const date = String(dateFromQuery);  
      const price = await this.stockService.getStockPrice({ symbol, date });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        body: price,
      };
    } catch (e: any) {
      console.log(e);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: e.statusCode || 500,
        body: {
          error: e.message,
        },
      };
    }
  };
  

 
}





















// const stockService = new StockService();

// export const getStockPrice = async (req: Request, res: Response) :Promise<ControllerResponse>=> {
//   const { symbol, date } = req.query;

//   if (!symbol || !date) {
//      res.status(400).json({ error: "Missing symbol or date" });
//   }

//   const price = await stockService.getStockPrice(symbol as string, date as string);
  
//   if (price === null) {
//      res.status(404).json({ error: "Stock price not found" });
//   }

//   return {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     statusCode: 201,
//     body: price
//   };
// };
