import { Sequelize } from "sequelize";

const db = new Sequelize("api_db", "root", "jgezziel", {
  host: "cont_db_api",
  dialect: "mysql",
  logging: false,
});

export default db;
