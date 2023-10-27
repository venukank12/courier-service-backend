import { body } from "express-validator";
import { page, pageSize, search } from "./common";

const recipientFullName = body("recipientFullName")
  .notEmpty()
  .withMessage("recipientFullName shoule be provided")
  .isLength({ min: 3, max: 50 })
  .withMessage("recipientFullName should be 3 to 50 characters");

const recipientAddress = body("recipientAddress")
  .notEmpty()
  .withMessage("recipientAddress shoule be provided")
  .isLength({ min: 3, max: 50 })
  .withMessage("recipientAddress should be 3 to 50 characters");

const shipmentDetails = [
  body("shipmentDetails")
    .notEmpty()
    .withMessage("shipmentDetails shoule be provided")
    .isObject()
    .withMessage("shipmentDetails should be object"),
  body("shipmentDetails.type").optional().isString(),
  body("shipmentDetails.method").optional().isString(),
  body("shipmentDetails.pickupDateAndTime").optional().isString(),
  body("shipmentDetails.pickupLocation").optional().isString(),
  body("shipmentDetails.expectedDeliveryDateAndTime").optional().isString(),
  body("shipmentDetails.deliveryLocation").optional().isString(),
  body("shipmentDetails.descriptions").optional().isString(),
  body("shipmentDetails.documents").optional().isString(),
  body("shipmentDetails.paymentInfo").optional().isString(),
  body("shipmentDetails.remarks").optional().isString(),
];

const status = body("status")
  .notEmpty()
  .withMessage("status shoule be provided")
  .matches(/\b(?:Pending|InTransit|Delivered)\b/)
  .withMessage("status should one of Pending or InTransit or Delivered");

export const createShipmentValidation = [
  recipientFullName,
  recipientAddress,
  ...shipmentDetails,
];

export const updatedShipementValidation = [
  recipientFullName,
  recipientAddress,
  status,
  ...shipmentDetails,
];

export const changeShipmentStatusValidation = [status];

export const getAllOrSearchShipmentsValidation = [page,search,pageSize];
