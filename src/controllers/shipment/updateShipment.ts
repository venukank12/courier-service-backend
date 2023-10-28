import { Request, Response } from "express";
import Shipment from "../../models/shipment";

const updateShipment = async (req: Request, res: Response) => {
  try {
    const { id, recipientFullName, recipientAddress, shipmentDetails } =
      req.body;

    await Shipment.update(
      {
        recipientFullName,
        recipientAddress,
        shipmentDetails,
      },
      { where: { id,user: req.user.id } }
    );

    return res.status(201).json({
      message: "shipment successfully updated!",
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default updateShipment;
