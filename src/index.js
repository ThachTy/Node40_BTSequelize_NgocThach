import express from "express";
import cors from "cors";
import "dotenv/config";
import "./config/connect.js";
import rootRoute from "./routes/rootRouter.js";
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());

app.use(cors());

app.use(rootRoute);

app.listen(PORT, () => {
  console.log("connect to server PORT : ", PORT);
});
