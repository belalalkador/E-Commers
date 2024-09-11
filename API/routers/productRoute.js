import express from "express";
import {
  addNewProducts,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProduct,
  getProductsByCategory,
  getAllProductsForCategory,
  search,
} from "../controllers/productController.js";
import { verifyToken } from "../middlwaers/veryfiToken.js";
import { upload } from "../middlwaers/multer.js";

const productRoute = express.Router();

productRoute.get("/search", search);
productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProduct);
productRoute.get("/products/bycategory", getProductsByCategory);
productRoute.get("/products/:category", getAllProductsForCategory);
productRoute.post(
  "/add",
  verifyToken,
  upload.single("productImage"),
  addNewProducts
);
productRoute.put(
  "/:id",
  verifyToken,
  upload.single("productImage"),
  updateProduct
);
productRoute.delete("/:id", verifyToken, deleteProduct);

export default productRoute;
