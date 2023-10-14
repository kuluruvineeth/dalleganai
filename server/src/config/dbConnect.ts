import mongoose from "mongoose";
import { config } from "./config";

export const dbConnect = (): void => {
  mongoose
    .connect(config.databaseUrl, {})
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => {
      console.log(`Database connection error ${err}`);
      process.exit();
    });
};
