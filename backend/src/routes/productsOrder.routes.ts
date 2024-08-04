import { Router } from "express";
import { ProductsOrderController } from "../controllers/productsOrder.controllers";

const productsOrderRoutes: Router = Router();

productsOrderRoutes.get("/", ProductsOrderController.readProductsOrders);
productsOrderRoutes.get("/:id", ProductsOrderController.readProductsOrderKey);
productsOrderRoutes.get(
  "/pdf/:id",
  ProductsOrderController.createPDFProductsOrderByKey
);
productsOrderRoutes.get(
  "/xml/:id",
  ProductsOrderController.createXMLProductsOrderByKey
);
productsOrderRoutes.get(
  "/xml/:id/:index",
  ProductsOrderController.createXMLproductIndex
);

export default productsOrderRoutes;
