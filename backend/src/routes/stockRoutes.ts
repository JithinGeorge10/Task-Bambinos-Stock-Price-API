import { Router } from "express";
import { getStockPrice } from "../controllers/stockControllers";

const router = Router();
router.get("/", getStockPrice);

export default router;
