import express from "express";
import validate from "../utils/validations";
import {
  changeShipmentStatusValidation,
  createShipmentValidation,
  getAllOrSearchShipmentsValidation,
  updateShipmentValidation,
} from "../utils/validations/shipment";

// controllers
import getAllOrSearchMyShipments from "../controllers/shipment/getAllOrSearchMyShipments";
import createShipment from "../controllers/shipment/createShipment";
import updateShipment from "../controllers/shipment/updateShipment";
import changeStatus from "../controllers/shipment/changeStatus";

// middleware
import authenticate from "../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  validate(getAllOrSearchShipmentsValidation),
  authenticate,
  getAllOrSearchMyShipments
);

router.post(
  "/",
  validate(createShipmentValidation),
  authenticate,
  createShipment
);

router.put(
  "/",
  validate(updateShipmentValidation),
  authenticate,
  updateShipment
);

router.patch(
  "/",
  validate(changeShipmentStatusValidation),
  authenticate,
  changeStatus
);

export default router;
