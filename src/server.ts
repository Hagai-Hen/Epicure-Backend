import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './db/connect';

import apiRoute from './routes/api';
dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 5000;

app.use(express.json());

app.use("/api", apiRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${PORT}`);
});