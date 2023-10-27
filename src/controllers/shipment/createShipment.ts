import { Request, Response } from "express";
import Shipment from "../../models/shipment";

const createShipment = async (req: Request, res: Response) => {
  try {
    const {recipientFullName,recipientAddress,shipmentDetails} = req.body;

    const shipment = await Shipment.create({
        recipientFullName,recipientAddress,
        shipmentDetails,
        user: req.user.id,
    });

    return res.status(201).json({
      message: "shipment successfully created!",
      data: shipment.dataValues
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default createShipment;
