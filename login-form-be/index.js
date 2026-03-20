import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT: ${process.env.PORT}`);
    connectDB();
  });
});
