import { Router } from "express";
import { expressCallback } from "../utils/expressCallback";
import { StockRepository } from "../repositories/StockRepository";
import { StockService } from "../services/StockService";
import { StockController } from "../controllers/stockControllers";
import {validateStockRequest} from '../middlewares/validators/stockInputValidator'

const repository= new StockRepository()
const service = new StockService(repository);
const controller = new StockController(service);


const router = Router();
router.route('/stock-price').get(validateStockRequest, expressCallback(controller.stockClosingPrice))
export default router;
