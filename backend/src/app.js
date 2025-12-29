import express from "express";
import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import authRoute from "./routes/authRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/wallet", walletRoutes);
app.use("/transaction", transactionRoutes);
app.use("/auth", authRoute)

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});