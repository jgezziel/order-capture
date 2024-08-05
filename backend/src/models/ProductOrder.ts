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

    return {
      message: "Product order found",
      success: true,
      productsInfoComplete,
    };
  },
};
