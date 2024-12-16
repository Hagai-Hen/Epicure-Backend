import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connect";
import swaggerUi from "swagger-ui-express";
import apiRoute from "./routes/api";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerDefinitions from "./swagger.json";
import cors from 'cors';

dotenv.config();

const app = express();

const PORT: number = Number(process.env.PORT) || 5000;
const swaggerSpec = swaggerJSDoc(swaggerDefinitions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/api", apiRoute);

app.use(cors({
  origin: 'http://localhost:5000', // Update with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you want to include cookies or credentials in the request
}));


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
