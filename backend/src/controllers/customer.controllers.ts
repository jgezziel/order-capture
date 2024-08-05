import type { Request, Response } from "express";
import { CustomerModel } from "../models/Customer";

export const CustomerController = {
  readCustomers: async (_req: Request, res: Response) => {
    const customers = await CustomerModel.readCustomers();
    if (!customers.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: customers.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Customers retrieved",
      data: customers.customers,
    });
  },
  readCustomerID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = await CustomerModel.readCustomerByID(Number(id));
    if (!customer.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: customer.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Customer retrieved",
      data: customer.customer,
    });
  },
};
