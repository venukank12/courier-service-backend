import { Request, Response } from "express";
import User from "../../models/user";
import hashPassword from "../../utils/helpers/hashPassword";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const login = async (req:Request, res:Response) => {
  try {
    const { email, password: pwd } = req.body;

    const user = await User.findOne({
      where: {
        [Op.and]: [
          {
            email,
          },
          {
            password: hashPassword(pwd),
          },
        ],
      },
    });

    if (!user) {
      return res
        .status(422)
        .json({ message: "we could not find your profile" });
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
      message: "login success",
      token: token,
      user: restUser,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default login;