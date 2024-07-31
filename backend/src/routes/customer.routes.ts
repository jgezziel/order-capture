import { Router } from "express";
import { CustomerController } from "../controllers/customer.controllers";

const customerRoutes: Router = Router();

customerRoutes.get("/", CustomerController.readCustomers);
customerRoutes.get("/:id", CustomerController.readCustomerID);

export default customerRoutes;
