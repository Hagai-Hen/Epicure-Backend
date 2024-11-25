import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import db from './db/connect';

dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;
db()

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});