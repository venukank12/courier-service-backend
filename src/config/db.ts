import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  username: process.env.APP_USER || "postgres",
  password: process.env.APP_PASS || "123",
  database: process.env.APP_DB_NAME || "courier-service-api-v1",
  host: process.env.APP_HOST || "localhost",
  dialect: "postgres"
});

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established!");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
};

export { connectDb, sequelize };
