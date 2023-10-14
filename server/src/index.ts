import express, { Application, Express, Request, Response } from "express";
import { validateEnv } from "./config/config";
import { dbConnect } from "./config/dbConnect";
import path from "path";
import cors from "cors";
import { imageRouter } from "./routes/image.route";

const app: Application = express();
const port = 8000;

//checking environment variables
validateEnv();

//establish db connection
dbConnect();

app.use(express.json());

app.use(cors());

app.use("/api/image", imageRouter);

app.use("/health", (req: Request, res: Response) => {
  res.send("Server is running....");
});

app.listen(port, () => {
  console.log(`server is listening on port : ${port}`);
});
