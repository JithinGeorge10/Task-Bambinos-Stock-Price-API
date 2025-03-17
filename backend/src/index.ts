import express from "express";
import morgan from "morgan";
import { PORT } from "./utils/constants";
import { connectDb } from "./config/database";
import stockRoutes from "./routes/stockRoutes";

const app = express();

app.use(morgan("dev"));    
app.use(express.json());
connectDb();

app.use("/api",stockRoutes);

app.listen(PORT,()=>{
    console.log('started');
})