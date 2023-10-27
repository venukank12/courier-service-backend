import express from "express";
import validate from "../utils/validations";
import {
  changeShipmentStatusValidation,
  createShipmentValidation,
  getAllOrSearchShipmentsValidation,
  updatedShipementValidation,
} from "../utils/validations/shipment";

// controllers
import getAllOrSearchMyShipments from "../controllers/shipment/getAllOrSearchMyShipments";
import createShipment from "../controllers/shipment/createShipment";
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
  validate(updatedShipementValidation),
  authenticate,
  createShipment
);

router.patch(
  "/",
  validate(changeShipmentStatusValidation),
  authenticate,
  changeStatus
);

export default router;
