import { Request, Response } from "express";
import Shipment from "../../models/shipment";

const changeStatus = async (req: Request, res: Response) => {
  try {
    const {shipmentId,status} = req.body;

    const shipment = await Shipment.findOne({
        where:{
            id:shipmentId,
            status,
            user: req.user.id
        }
    });

    if(!shipment){
        return res.status(422).json({ message: "Shipment do not exits!" });
    }

    await Shipment.update({status},{
        where:{
            id:shipment.dataValues.id
        }
    });

    return res.status(200).json({
      message: "Shipment status successfully changed!"
    });

  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default changeStatus;
