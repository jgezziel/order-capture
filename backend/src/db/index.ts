import { Sequelize } from "sequelize-typescript";

const db = new Sequelize("api_db", "root", "jgezziel", {
  host: "cont_db_api",
  dialect: "mysql",
  logging: true,
  models: [`${__dirname}/../models/**/*.ts`],
});

export default db;
