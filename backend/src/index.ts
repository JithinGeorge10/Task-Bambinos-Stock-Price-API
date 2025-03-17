import express from "express";
import morgan from "morgan";
import { PORT } from "./utils/constants";
import stockRoutes from "./routes/stockRoutes";


const app = express();

app.use(morgan("dev"));    
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('kkk')
})
app.use("/api/stock-price",stockRoutes);



app.listen(3000,()=>{
    console.log('started');
})