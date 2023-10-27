import { sequelize } from "../config/db";
import { DataTypes } from "sequelize";
import ShipmentStatus from "../utils/consents/shipmentStatus";
import User from "./user";
import moment from "moment";

const Shipment = sequelize.define(
  "Shipment",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    trackingNo:{
      type: DataTypes.STRING,
      unique:true
    },
    recipientFullName: {
      type: DataTypes.STRING,
    },
    recipientAddress: {
      type: DataTypes.STRING,
    },
    shipmentDetails: {
      type: DataTypes.JSONB,
    },
    status: {
      type: DataTypes.STRING,
      values: Object.values(ShipmentStatus),
      defaultValue: ShipmentStatus.Pending,
    },
  },
  {
    timestamps: true,
  }
);

Shipment.belongsTo(User, {
  foreignKey:'user'
});

Shipment.beforeCreate((shipment:any) => {
  shipment.trackingNo = "CS"+shipment.user+moment.utc().format("DDMMYYhhmmss");
});

export default Shipment;
