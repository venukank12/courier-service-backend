import { Request, Response } from "express";
import User from "../../models/user";
import hashPassword from "../../utils/helpers/hashPassword";
import jwt from "jsonwebtoken";

const register = async (req:Request, res:Response) => {
  try {
    const { firstName, lastName, email, password:pwd,address,phoneNumber } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      return res.status(422).json({ message: "email already registered!" });
    }

    const newUser = await User.create({ firstName, lastName, email, password:hashPassword(pwd),address,phoneNumber });

    const { password, ...restUser } = newUser.dataValues;
    
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
      message: "register success",
      token: token,
      user: restUser,
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default register;