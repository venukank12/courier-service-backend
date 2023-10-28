import { Request, Response } from "express";
import User from "../../models/user";
import hashPassword from "../../utils/helpers/hashPassword";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const refreshToken = async (req:Request, res:Response) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res
        .status(422)
        .json({ message: "we could not refresh your token!" });
    }

    const { password, ...restUser } = user.dataValues;
    
    const token = jwt.sign(
      {
        sub: restUser.id,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "new access token generated success",
      token: token,
      user: restUser,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default refreshToken;