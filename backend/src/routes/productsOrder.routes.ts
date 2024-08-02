import { Router } from "express";
import { ProductsOrderController } from "../controllers/productsOrder.controllers";

const productsOrderRoutes: Router = Router();

productsOrderRoutes.get("/", ProductsOrderController.readProductsOrders);
productsOrderRoutes.get("/:id", ProductsOrderController.readProductsOrderKey);

export default productsOrderRoutes;
