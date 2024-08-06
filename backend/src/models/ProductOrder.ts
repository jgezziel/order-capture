import type { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  DefaultScope,
} from "sequelize-typescript";
import type { ProductOrderSchema } from "../schemas/productOrder.schema";
import Product from "./Product";
import Order from "./Order";
import Customer from "./Customer";
import ShippingAddress from "./ShippingAddress";

type ProductOrderCreationAttributes = Optional<ProductOrderSchema, "id">;

@Table({
  tableName: "product_orders",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  attributes: {
    exclude: ["createdAt", "updatedAt", "deletedAt"],
  },
}))
class ProductOrder extends Model<
  ProductOrderSchema,
  ProductOrderCreationAttributes
> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    comment: "This is the primary key",
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    comment: "This is the order id",
  })
  idOrder!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "This is the product id",
  })
  idProduct!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "This is the quantity of the product",
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    comment: "This is the price of the product",
  })
  price!: number;
}

export default ProductOrder;

export const ProductOrderModel = {
  readProductsOrders: async () => {
    const productsOrders = await ProductOrder.findAll();
    console.log(productsOrders);
    if (productsOrders.length === 0) {
      return {
        message: "No products orders found",
        success: false,
      };
    }
    return {
      message: "Products orders found",
      success: true,
      productsOrders,
    };
  },
  readProductsOrderKey: async (id: string) => {
    const productOrderExists = await ProductOrder.findOne({
      where: { idOrder: id },
    });
    if (!productOrderExists) {
      return {
        message: "Product order not found",
        success: false,
      };
    }

    const productOrder = await ProductOrder.findAll({
      where: { idOrder: id },
    });

    return {
      message: "Product order found",
      success: true,
      productOrder,
    };
  },
  createXMLProductsOrderByKey: async (id: string) => {
    const productOrderExists = await ProductOrder.findOne({
      where: { idOrder: id },
    });
    if (!productOrderExists) {
      return {
        message: "Product order not found",
        success: false,
      };
    }
    const productOrder = await ProductOrder.findAll({
      where: { idOrder: id },
    });

    const products = await Product.findAll({
      where: { id: productOrder.map((item) => item.idProduct) },
    });

    const orderCustomer = await Order.findOne({
      where: { idOrder: id },
    });

    const customer = await Customer.findOne({
      where: { id: orderCustomer?.idCustomer },
    });

    const shippingAddresses = await ShippingAddress.findOne({
      where: { id: orderCustomer?.idShippingAddress },
    });

    const productsInfoComplete = products.map((product) => {
      const productOrderInfo = productOrder.find(
        (item) => item.idProduct === product.id
      );
      return {
        ...product.dataValues,
        quantity: productOrderInfo?.quantity,
        price: productOrderInfo?.price,
      };
    });

    const information = {
      orderCustomer,
      customer,
      address: shippingAddresses,
      products: productsInfoComplete,
    };

    const prefixMinorTen = (num: number) => (num < 10 ? `0${num}` : num);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <DRDataTransfer>
      <Customer>
        <Number>${information.customer?.id}</Number>
        <Name>${information.customer?.name}</Name>
        <Addresses>
          <Address Code="${information.address?.id}" Description="${
      information.address?.NameShort
    }" PostalCode="${information.address?.postalCode}" Address1="${
      information.address?.address
    }"/>
        </Addresses>
      </Customer>
      ${information.products
        .map(
          (product, ind) => `
        <Article>
          <Number>${product.sku}</Number>
          <Description>${product.description}</Description>
          <SalesPrice>${product.price}</SalesPrice>
        </Article>
        <Order>
          <Transaction>0</Transaction>
          <OrderNumber>${id}</OrderNumber>
          <PartNumber>${prefixMinorTen(ind + 1)}</PartNumber>
          <OrderedQuantity>${product.quantity}</OrderedQuantity>
          <DueDate>${orderCustomer?.dateOrder}</DueDate>
        </Order>
      `
        )
        .join("")}
    </DRDataTransfer>
    `;

    return {
      message: "Product order found",
      success: true,
      xml,
    };
  },
  createXMLproductIndex: async (id: string, index: string) => {
    const productOrderExists = await ProductOrder.findOne({
      where: { idOrder: id },
    });

    if (!productOrderExists) {
      return {
        message: "Product order not found",
        success: false,
      };
    }

    const productOrder = await ProductOrder.findAll({
      where: { idOrder: id },
    });

    const products = await Product.findAll({
      where: { id: productOrder.map((item) => item.idProduct) },
    });

    const orderCustomer = await Order.findOne({
      where: { idOrder: id },
    });

    const customer = await Customer.findOne({
      where: { id: orderCustomer?.idCustomer },
    });

    const shippingAddresses = await ShippingAddress.findOne({
      where: { id: orderCustomer?.idShippingAddress },
    });

    const productsInfoComplete = products.map((product) => {
      const productOrderInfo = productOrder.find(
        (item) => item.idProduct === product.id
      );
      return {
        ...product.dataValues,
        quantity: productOrderInfo?.quantity,
        price: productOrderInfo?.price,
      };
    });

    const information = {
      orderCustomer,
      customer,
      address: shippingAddresses,
      products: productsInfoComplete,
    };

    const prefixMinorTen = (num: number) => (num < 10 ? `0${num}` : num);

    if (Number(index) >= productsInfoComplete.length) {
      return {
        message: "Product not found",
        success: false,
      };
    }

    const product = productsInfoComplete[Number(index)];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <DRDataTransfer>
      <Customer>
        <Number>${information.customer?.id}</Number>
        <Name>${information.customer?.name}</Name>
        <Addresses>
          <Address Code="${information.address?.id}" Description="${
      information.address?.NameShort
    }" PostalCode="${information.address?.postalCode}" Address1="${
      information.address?.address
    }"/>
        </Addresses>
      </Customer>
      <Article>
        <Number>${product.sku}</Number>
        <Description>${product.description}</Description>
        <SalesPrice>${product.price}</SalesPrice>
      </Article>
      <Order>
        <Transaction>0</Transaction>
        <OrderNumber>${id}</OrderNumber>
        <PartNumber>${prefixMinorTen(Number(index) + 1)}</PartNumber>
        <OrderedQuantity>${product.quantity}</OrderedQuantity>
        <DueDate>${orderCustomer?.dateOrder}</DueDate>
      </Order>
    </DRDataTransfer>
    `;

    return {
      message: "Product found",
      success: true,
      xml,
    };
  },
};
