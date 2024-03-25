import "dotenv/config";

const { DB_NAME, DB_ACCOUNT, DB_PASS, DB_HOST, DB_DIALECT, DB_PORT } =
  process.env;

export default {
  database: DB_NAME,
  account: DB_ACCOUNT,
  password: DB_PASS,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
};
