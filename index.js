import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/database.js";
import router from "./src/routes/index.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:5173", // Local development URL
  "https://product-store-watetu.netlify.app", // Production URL
];

//routes
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true); // Allow the origin
      } else {
        callback(new Error("Not allowed by CORS")); // Reject if origin is not allowed
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type"], // Allow these headers
  })
);

app.use(router);

app.get("/ping", (req, res) => {
  res.send("Server is active");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on: http://localhost:${PORT}`);
});
