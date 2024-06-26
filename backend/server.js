import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/textRoute.js";
import connectDb from "./config/dbConnection.js";
import errorHandler from "./middleware/errorHandler.js";

connectDb();
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to the Text API");
});

app.get(errorHandler);

app.listen(port, () => {
  console.log(`Server is Listening on http://localhost:${port}`);
});
