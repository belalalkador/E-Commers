import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import DBconnect from "./config/DBconnect.js";
import authRoute from "./routers/authRoute.js";
import productRoute from "./routers/productRoute.js";
import buyingRouter from "./routers/buyingRoute.js";
import path from "path";
dotenv.config({});

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1", buyingRouter);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "the app is working 😆",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An internal server error occurred!",
  });
});

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  DBconnect();
  console.log(`App is running on port ${PORT} 😁`);
});
