import type { Request, Response } from "express";
import { ShippingAddressModel } from "../models/ShippingAddress";

export const ShippingAddressController = {
  readShippingAddresses: async (_req: Request, res: Response) => {
    const shippingAddresses =
      await ShippingAddressModel.readShippingAddresses();
    if (!shippingAddresses.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: shippingAddresses.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Shipping Addresses retrieved",
      data: shippingAddresses.shippingAddresses,
    });
  },
  readShippingAddressID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const shippingAddress = await ShippingAddressModel.readShippingAddressID(
      Number(id)
    );
    if (!shippingAddress.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: shippingAddress.message,
      });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "Shipping Address retrieved",
      data: shippingAddress.shippingAddress,
    });
  },
  readShippingAddressCustomerID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const customerShippingAddresses =
      await ShippingAddressModel.readShippingAddressCustomerID(Number(id));
    if (!customerShippingAddresses.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: customerShippingAddresses.message,
      });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "Shipping Addresses retrieved",
      data: customerShippingAddresses.customerShippingAddresses,
    });
  },
};
