require('dotenv').config();
import express, { Request, Response } from "express";

// import service routes
import authRoute from "./src/routes/auth";
import Route from "./src/utils/consents/Route";
import { connectDb, sequelize } from "./src/config/db";

// create express app
const app = express();
// const cors = require("cors");

// initialize middlewares
// app.use(cors());
app.use(express.json());


// api end points
app.use(Route.AUTH, authRoute);


// not found apis response
app.use((req:Request, res:Response) => res.status(404).json({message:'404 Not found'}));


// configure & listening port
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  console.log(`courier service backend listening on port no:${PORT}`);
  await connectDb();
  sequelize.sync({alter:true}).then(()=>console.log('DB synced success!'))
});