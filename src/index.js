import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import router from "./routes/index.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//routes
app.use(express.json());
app.use(router);

app.get("/", (request, response) => {
  return response.send("hello world");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on: http://localhost:${PORT}`);
});
