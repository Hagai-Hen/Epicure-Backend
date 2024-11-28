import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connect";
import swaggerUi from "swagger-ui-express";
import apiRoute from "./routes/api";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 5000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use("/api", apiRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
