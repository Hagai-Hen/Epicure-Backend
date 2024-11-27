import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connect";
import { logger } from "./middlewares/logger";
import { notFound } from "./middlewares/notFound";

import apiRoute from "./routes/api";
import { errorHandler } from "./middlewares/error";
dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(logger);
app.use("/api", apiRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
