import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import ShipmentStatus from "../utils/consents/shipmentStatus";
import User from "./user";

const Shipment = sequelize.define(
  "Shipment",
  {
    id: {
        type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    recipientFullName: {
      type: DataTypes.STRING,
    },
    recipientAddress: {
      type: DataTypes.STRING,
    },
    shipmentDetails: {
      type: DataTypes.STRING,
    },
    status:{
        type:DataTypes.STRING,
        values:Object.values(ShipmentStatus),
        defaultValue:ShipmentStatus.Pending
    }
  },
  {
    timestamps: true,
  }
);

Shipment.belongsTo(User,{
    foreignKey:{
        name:'user',
        allowNull:false
    }
});

export default Shipment;