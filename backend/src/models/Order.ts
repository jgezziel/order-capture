import type { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
} from "sequelize-typescript";
import type { OrderSchema, PreOrderSchema } from "../schemas/order.schema";
import Customer from "./Customer";
import ShippingAddress from "./ShippingAddress";
import ProductOrder from "./ProductOrder";

type OrderCreationAttributes = Optional<OrderSchema, "id">;

@Table({
  tableName: "orders",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  attributes: {
    exclude: ["createdAt", "updatedAt", "deletedAt"],
  },
}))
class Order extends Model<OrderSchema, OrderCreationAttributes> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    comment: "This is the primary key",
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: "This is the order id",
  })
  idOrder!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "This is the customer id",
  })
  idCustomer!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "This is the shipping address id",
  })
  idShippingAddress!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: "This is the date of the order",
  })
  dateOrder!: string;

  @Default("pending")
  @Column({
    type: DataType.ENUM("pending", "completed", "cancelled"),
    allowNull: false,
    comment: "This is the status of the order",
  })
  status!: string;
}

export default Order;

export const OrderModel = {
  readOrders: async () => {
    const orders = await Order.findAll();
    if (orders.length === 0) {
      return {
        message: "Orders not found",
        success: false,
      };
    }

    const customerIDs = orders.map((order) => order.idCustomer);
    const shippingAddressIDs = orders.map((order) => order.idShippingAddress);

    const customers = await Customer.findAll({
      where: {
        id: customerIDs,
      },
    });

    const shippingAddresses = await ShippingAddress.findAll({
      where: {
        id: shippingAddressIDs,
      },
    });

    const ordersWithCustomerAndShippingAddress = orders.map((order) => {
      const { idCustomer, idShippingAddress } = order;

      const customer = customers.find((customer) => customer.id === idCustomer);
      const shippingAddress = shippingAddresses.find(
        (shippingAddress) => shippingAddress.id === idShippingAddress
      );

      return {
        ...order.toJSON(),
        customer: customer?.name,
        shippingAddress: shippingAddress?.address,
      };
    });

    return {
      message: "Orders retrieved",
      success: true,
      orders: ordersWithCustomerAndShippingAddress,
    };
  },
  readOrderID: async (id: string) => {
    const order = await Order.findOne({
      where: {
        idOrder: id,
      },
    });

    if (!order) {
      return {
        message: "Order not found",
        success: false,
      };
    }

    const customer = await Customer.findOne({
      where: {
        id: order.idCustomer,
      },
    });

    const shippingAddress = await ShippingAddress.findOne({
      where: {
        id: order.idShippingAddress,
      },
    });

    const orderWithCustomerAndShippingAddress = {
      ...order.toJSON(),
      customer: customer?.name,
      shippingAddress: shippingAddress?.address,
    };

    return {
      message: "Order retrieved",
      success: true,
      order: orderWithCustomerAndShippingAddress,
    };
  },
  createOrder: async (data: PreOrderSchema) => {
    const { idCustomer, idOrder, idShippingAddress, preOrder } = data;
    const newOrder = {
      idCustomer,
      idOrder,
      idShippingAddress,
      dateOrder: new Date().toISOString(),
      status: "pending" as "pending" | "completed" | "cancelled",
    };

    const order = await Order.create(newOrder);
    if (!order) {
      return {
        message: "Order not created",
        success: false,
      };
    }

    const newProductsOrders = preOrder.map((product) => ({
      idOrder: order.idOrder,
      idProduct: product.idProduct,
      quantity: product.quantity,
      price: product.price,
    }));

    const productsOrders = await ProductOrder.bulkCreate(newProductsOrders);
    if (!productsOrders) {
      return {
        message: "Product order not created",
        success: false,
      };
    }

    return {
      message: "Order created",
      success: true,
      order,
    };
  },
};
