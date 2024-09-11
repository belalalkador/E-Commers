import express from "express";
import { verifyToken } from "../middlwaers/veryfiToken.js";
import {
  createBuying,
  deleteBuyingById,
  getAllBuyingUser,
} from "../controllers/buyingController.js";

const buyingRouter = express.Router();

buyingRouter.post("/buy", verifyToken, createBuying);
buyingRouter.get("/buy/users", verifyToken, getAllBuyingUser);
buyingRouter.delete("/buy/user/:id", verifyToken, deleteBuyingById);

export default buyingRouter;
