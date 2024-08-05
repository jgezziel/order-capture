import type { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  DefaultScope,
} from "sequelize-typescript";
import type { ProductSchema } from "../schemas/product.schema";

type ProductCreationAttributes = Optional<ProductSchema, "id">;

@Table({
  tableName: "products",
  timestamps: true,
  paranoid: true,
})
@DefaultScope(() => ({
  where: { status: "active" },
  attributes: {
    exclude: ["createdAt", "updatedAt", "deletedAt"],
  },
}))
class Product extends Model<ProductSchema, ProductCreationAttributes> {
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
    comment: "This is the SKU of the product",
  })
  sku!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    comment: "This is the description of the product",
  })
  description!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
    comment: "This is the measurement unit of the product",
  })
  measurementUnit!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    comment: "This is the price of the product",
  })
  price!: number;

  @Default("active")
  @Column({
    type: DataType.ENUM("active", "inactive"),
    allowNull: false,
    comment: "This is the status of the product",
  })
  status!: string;
}

export default Product;

export const ProductModel = {
  readProducts: async () => {
    const products = await Product.findAll();
    if (!products) {
      return {
        message: "Products not found",
        success: false,
      };
    }
    return {
      message: "Products retrieved",
      success: true,
      products,
    };
  },
  readProductByID: async (id: number) => {
    const product = await Product.findByPk(id);
    if (product == null) {
      return {
        message: "Product not found",
        success: false,
      };
    }
    return {
      message: "Product retrieved",
      success: true,
      product,
    };
  },
};
