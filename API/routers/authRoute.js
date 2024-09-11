import express from "express";
import {
  signup,
  signin,
  getUser,
  signout,
  deleteUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middlwaers/veryfiToken.js";

const authRoute = express.Router();

// Post || Signup
authRoute.post("/signup", signup);

authRoute.post("/signin", signin);

authRoute.get("/signout", verifyToken, signout);

authRoute.delete("/user/:id", verifyToken, deleteUser);

authRoute.get("/user", verifyToken, getUser);

authRoute.get("/check-admin", verifyToken, (req, res) => {
  if (req.user.is_Admin) {
    return res.status(200).json({
      ok: true,
    });
  }
});

export default authRoute;
