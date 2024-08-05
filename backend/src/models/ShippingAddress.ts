import type { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import type { ShippingAddressSchema } from "../schemas/shippingAddress.schema";
import Customer from "./Customer";

type ShippingAddressCreationAttributes = Optional<ShippingAddressSchema, "id">;
@Table({
  tableName: "shippingAddresses",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  where: { status: "active" },
  attributes: {
    exclude: ["createdAt", "updatedAt", "deletedAt"],
  },
}))
class ShippingAddress extends Model<
  ShippingAddressSchema,
  ShippingAddressCreationAttributes
> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    comment: "This is the primary key",
  })
  id!: number;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: "This is the customer ID",
  })
  customerId!: number;

  @BelongsTo(() => Customer)
  customer!: Customer;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the short name of the address",
  })
  NameShort!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: "This is the address",
  })
  address!: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
    comment: "This is the postal code",
  })
  postalCode!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: "This is the phone number",
  })
  phone!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the contact",
  })
  contact!: string;

  @Default("active")
  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    comment: "This is the status",
  })
  status!: string;
}

export default ShippingAddress;

export const ShippingAddressModel = {
  readShippingAddresses: async () => {
    const shippingAddresses = await ShippingAddress.findAll();
    if (shippingAddresses.length === 0) {
      return {
        message: "Shipping Addresses not found",
        success: false,
      };
    }
    return {
      message: "Shipping Addresses retrieved",
      success: true,
      shippingAddresses,
    };
  },
  readShippingAddressID: async (id: number) => {
    const shippingAddress = await ShippingAddress.findByPk(id);
    if (!shippingAddress) {
      return {
        message: "Shipping Address not found",
        success: false,
      };
    }
    return {
      message: "Shipping Address retrieved",
      success: true,
      shippingAddress,
    };
  },
  readShippingAddressCustomerID: async (id: number) => {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return {
        message: "Customer not found",
        success: false,
      };
    }

    const customerShippingAddresses = await ShippingAddress.findAll({
      where: {
        customerId: customer.id,
      },
    });

    if (customerShippingAddresses.length === 0) {
      return {
        message: "Shipping Addresses not found",
        success: false,
      };
    }

    return {
      message: "Shipping Addresses retrieved",
      success: true,
      customerShippingAddresses,
    };
  },
};
