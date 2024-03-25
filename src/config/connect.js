import sequelize from "sequelize";
import options from "./config.js";

let { database, account, password, host, port, dialect } = options;

const connect = new sequelize(database, account, password, {
  host,
  port,
  dialect,
});

export default connect;
