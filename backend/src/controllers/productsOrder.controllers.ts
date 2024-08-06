import type { Request, Response } from "express";
import { ProductOrderModel } from "../models/ProductOrder";
import PuppeteerHTMLPDF from "puppeteer-html-pdf";

import {
  productsOrders,
  products,
  orders,
  customers,
  shippingAddresses,
} from "../db/data";

export const ProductsOrderController = {
  readProductsOrders: async (_req: Request, res: Response) => {
    const productsOrders = await ProductOrderModel.readProductsOrders();
    if (!productsOrders.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: productsOrders.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Products orders retrieved",
      data: productsOrders.productsOrders,
    });
  },
  readProductsOrderKey: async (req: Request, res: Response) => {
    const { id } = req.params;

    const productsOrder = await ProductOrderModel.readProductsOrderKey(id);
    if (!productsOrder.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: productsOrder.message,
      });
    }
    return res.json({
      status: "success",
      code: 200,
      message: "Products order retrieved",
      data: productsOrder.productOrder,
    });
  },
  createPDFProductsOrderByKey: async (_req: Request, res: Response) => {
    const { id } = _req.params;
    const existId = productsOrders.find(
      (productsOrder) => productsOrder.idOrder === id
    );
    if (!existId) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Products order not found",
      });
    }

    const productsOrder = productsOrders.filter(
      (productsOrder) => productsOrder.idOrder === id
    );

    const dataCompletProductsOrder = productsOrder.map((productOrder) => {
      const product = products.find(
        (product) => product.id === productOrder.idProduct
      );
      return {
        ...productOrder,
        sku: product?.sku,
        description: product?.description,
        measurementUnit: product?.measurementUnit,
      };
    });

    const orderCustomer = orders.find((order) => order.idOrder === id);
    const customer = customers.find(
      (customer) => customer.id === orderCustomer?.idCustomer
    );
    const address = shippingAddresses.find(
      (address) => address.id === orderCustomer?.idShippingAddress
    );

    const listProdcts = dataCompletProductsOrder;

    const information = {
      dateOrder: orderCustomer?.dateOrder,
      customer: customer,
      address: address,
      products: listProdcts,
    };
    /*
    return res.json({
      status: "success",
      code: 200,
      message: "Products order retrieved",
      data: {
        information,
      },
    });*/

    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setOptions({
      format: "A4",
      printBackground: true,
      landscape: true,
      margin: {
        top: "20px",
        bottom: "40px",
        left: "20px",
        right: "20px",
      },
    });

    const content = `<style> section {color:black; font-family:arial, sans-serif;} td,th {padding: 0.5rem 1rem;
    border: 1px solid #e5e7eb;}</style> 
    <section>
    <h1>Pedido - ${id}</h1>
    <h3 style="margin:0;padding:0;">Fecha de Pedido: ${
      information.dateOrder
    }</h3>
    <br>
    <p style="margin:8px 0;padding:0;"><b>Cliente:</b> ${
      information.customer?.name
    }</p>
    <p style="margin:8px 0;padding:0;"><b>Teléfono:</b> ${
      information.customer?.phone
    } | <b>Correo:</b> ${information.customer?.email}</p>
    <br>
    <h4 style="margin:8px 0;padding:0;">Dirección de Envío</h4>
    <p style="margin:8px 0;padding:0;">${information.address?.NameShort} | ${
      information.address?.address
    }</p>

    <p></p>
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>SKU</th>
          <th>Descripción</th>
          <th>Unidad de Medida</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${listProdcts
          .map(
            (productsOrder) =>
              `<tr>
                <td>${productsOrder.idProduct}</td>
                <td>${productsOrder.sku}</td>
                <td>${productsOrder.description}</td>
                <td>${productsOrder.measurementUnit}</td>
                <td>${productsOrder.quantity}</td>
                <td>$ ${productsOrder.price}</td>    
                <td>$ ${
                  productsOrder.price * productsOrder.quantity
                }</td>           
              </tr>`
          )
          .join("")}
      </tbody>
      <table>
      <thead>
        <tr>
          <th colspan="6">Total</th>
          <th>$ ${listProdcts.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )}</th>
        </tr>
      </thead>
    </table>
    </section>
    `;

    try {
      const pdf = await htmlPDF.create(content);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=order-${id}.pdf`
      );
      return res.send(pdf);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        code: 500,
        message: "Error creating PDF",
        error: error,
      });
    }
  },
  createXMLProductsOrderByKey: async (_req: Request, res: Response) => {
    const { id } = _req.params;

    const xml = await ProductOrderModel.createXMLProductsOrderByKey(id);
    if (!xml.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: xml.message,
      });
    }

    res.setHeader("Content-Type", "application/xml");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=order-${id}.xml`
    );
    return res.send(xml.xml);
  },
  createXMLproductIndex: async (_req: Request, res: Response) => {
    const { id, index } = _req.params;

    const xml = await ProductOrderModel.createXMLproductIndex(id, index);
    if (!xml.success) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: xml.message,
      });
    }

    res.setHeader("Content-Type", "application/xml");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=order-${id}-Part${Number(index) + 1}.xml`
    );
    return res.send(xml.xml);
  },
};
