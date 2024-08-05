import type { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
} from "sequelize-typescript";
import type { CustomerSchema } from "../schemas/customer.schema";

type CustomerCreationAttributes = Optional<CustomerSchema, "id">;

@Table({
  tableName: "customers",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  where: { status: "active" },
  attributes: {
    exclude: ["createdAt", "updatedAt", "deletedAt"],
  },
}))
class Customer extends Model<CustomerSchema, CustomerCreationAttributes> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
    comment: "This is the primary key",
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the name of the customer",
  })
  name!: string;

  @Column({
    type: DataType.STRING(13),
    allowNull: false,
    comment: "This is the RFC of the customer",
  })
  rfc!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: "This is the fiscal address of the customer",
  })
  fiscalAddress!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the email of the customer",
  })
  email!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: "This is the phone of the customer",
  })
  phone!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: "This is the contact of the customer",
  })
  contact!: string;

  @Default("active")
  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    comment: "This is the status of the customer",
  })
  status!: string;
}

export default Customer;

export const CustomerModel = {
  readCustomers: async () => {
    const customers = await Customer.findAll();
    if (customers.length === 0) {
      return { message: "No customers found", success: false };
    }
    return {
      message: "Customers retrieved",
      success: true,
      customers,
    };
  },
  readCustomerByID: async (id: number) => {
    const customer = await Customer.findByPk(id);
    if (customer === null) {
      return { message: "Customer not found", success: false };
    }
    return { message: "Customer retrieved", success: true, customer };
  },
};
