import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  date: { type: String, required: true },
  closing_price: { type: Number, required: true }
});

const StockModel = mongoose.model("Stock", StockSchema);
export default StockModel;
