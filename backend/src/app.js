import express from "express";
import userRoutes from "./routes/userRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/wallet", walletRoutes);
app.use("/transaction", transactionRoutes);

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
