import { Request } from "express";
import { ControllerResponse } from "./stockController.types";

export interface IStockController {
    stockClosingPrice(httpRequest: Request): Promise<ControllerResponse>;
}
