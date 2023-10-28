import { Request, Response } from "express";
import Shipment from "../../models/shipment";
import ShipmentStatus from "../../utils/consents/shipmentStatus";
import { Op } from "sequelize";

const getAllOrSearchMyShipments = async (req: Request, res: Response) => {
  try {
    const pageSize =
      req.query && req.query.pageSize
        ? parseInt(req.query.pageSize as string)
        : 10;
    const page =
      req.query && req.query.page ? parseInt(req.query.page as string) : 1;
    const status =
      req.query && req.query.status
        ? req.query.status
        : Object.values(ShipmentStatus);

    let where: any = {
      user: req.user.id,
      status,
    };

    if (req.query.search)
      where = {
        ...where,
        [Op.or]: [{ trackingNo: { [Op.like]: `%${req.query.search}%` } }],
      };

    const data = await Shipment.findAndCountAll({
      where,
      order: [["updatedAt", "DESC"]],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return res.status(200).json({
      message: "My shipments successfuly retrived!",
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(data.count / pageSize),
        pageSize: pageSize,
        totalRecords: data.count,
      },
      data: data.rows,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default getAllOrSearchMyShipments;
