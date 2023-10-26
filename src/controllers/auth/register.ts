import { Request, Response } from "express";
import User from "../../models/user";
import hashPassword from "../../utils/helpers/hashPassword";

const register = async (req:Request, res:Response) => {
  try {
    const { firstName, lastName, email, password,address,phoneNumber } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      return res.status(422).json({ message: "email already registered!" });
    }

    await User.create({ firstName, lastName, email, password:hashPassword(password),address,phoneNumber });

    return res.status(200).json({
      message: "register success",
    });
  } catch (err) {
    res.status(500).json({
      message: (err as any).message,
    });
  }
};

export default register;