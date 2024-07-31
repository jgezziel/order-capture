import { Router } from "express";
import { ShippingAddressController } from "../controllers/shippingAddress.controllers";

const shippingAddressRoutes: Router = Router();

shippingAddressRoutes.get("/", ShippingAddressController.readShippingAddresses);
shippingAddressRoutes.get(
  "/:id",
  ShippingAddressController.readShippingAddressID
);
shippingAddressRoutes.get(
  "/customer/:id",
  ShippingAddressController.readShippingAddressCustomerID
);

export default shippingAddressRoutes;
