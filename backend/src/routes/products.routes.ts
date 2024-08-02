import { Router } from "express";
import { ProductController } from "../controllers/products.controllers";

const productRoutes: Router = Router();

productRoutes.get("/", ProductController.readProducts);
productRoutes.get("/:id", ProductController.readProductID);

export default productRoutes;