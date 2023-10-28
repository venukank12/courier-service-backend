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
  body("shipmentDetails.type")
    .notEmpty()
    .withMessage("shipment type shoule be provided")
    .matches(/\b(?:Standard|Express|International)\b/)
    .withMessage(
      "shipment type should be one of Standard or Express or International"
    ),
  body("shipmentDetails.method")
    .notEmpty()
    .withMessage("shipment method shoule be provided")
    .matches(/\b(?:Ground|Air|Ocean)\b/)
    .withMessage("shipment method should be one of Ground or Air or Ocean"),
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

export const updateShipmentValidation = [
  recipientFullName,
  recipientAddress,
  status,
  ...shipmentDetails,
];

export const changeShipmentStatusValidation = [status];

export const getAllOrSearchShipmentsValidation = [page, search, pageSize];
