import { Request, Response, NextFunction } from "express";
import validator from "validator";

export const validateStockRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => { 
  try {
    const { symbol, date } = req.query;

    if (!symbol || typeof symbol !== "string" || !validator.isAlphanumeric(symbol)) {
      res.status(400).json({
        error: "Invalid or missing stock symbol. Symbol must be alphanumeric.",
      });
      return;
    }

    if (!date || typeof date !== "string") {
      res.status(400).json({
        error: "Missing date parameter. Date must be in 'YYYY-MM-DD' format.",
      });
      return;
    }

    if (!validator.isDate(date, { format: "YYYY-MM-DD", strictMode: true })) {
      res.status(400).json({
        error: "Invalid date format. Use 'YYYY-MM-DD'.",
      });
      return;
    }

    const inputDate = new Date(date);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 10);

    if (inputDate < minDate || inputDate > today) {
      res.status(400).json({
        error: "Date is out of range. It must be within the last 10 years.",
      });
      return;
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};
