import { Request, Response } from "express";

export const getStockPrice = async (req: Request, res: Response) => {
  try {
    const { symbol, date } = req.query as { symbol: string; date: string };
    console.log(symbol)
    console.log(date)
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
