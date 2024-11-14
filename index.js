import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import router from "./src/routes/index.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

//routes
app.use(express.json());
app.use(router);

app.get("/ping", (req, res) => {
  res.send("Server is active");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on: http://localhost:${PORT}`);
});
