import type { Request, Response } from "express";

import { customers } from "../db/data";

export const CustomerController = {
  readCustomers: async (_req: Request, res: Response) => {
    return res.json({
      status: "success",
      code: 200,
      message: "Customers retrieved",
      data: customers,
    });
  },
  readCustomerID: async (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = customers.find((customer) => customer.id === Number(id));
    if (!customer) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Customer not found",
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Customer retrieved",
      data: customer,
    });
  },
};
