import express from "express";
import morgan from "morgan";
import { PORT, FRONTEND_URL } from "./utils/constants";
import { connectDb } from "./config/database";
import stockRoutes from "./routes/stockRoutes";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
connectDb();
const corsOptions = {
    origin: FRONTEND_URL() || "*",
    credentials: true,
};
app.use(cors(corsOptions));

app.use("/api", stockRoutes);

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`)
})