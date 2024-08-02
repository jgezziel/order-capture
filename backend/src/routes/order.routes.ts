import { Router } from "express";
import { OrderController } from "../controllers/order.controllers";

const orderRoutes: Router = Router();

orderRoutes.get("/", OrderController.readOrders);
orderRoutes.get("/:id", OrderController.readOrderID);

export default orderRoutes;
