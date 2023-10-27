import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token =
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]) ||
    ("" as string);

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    async (err, payload: any) => {
      if (err) {
        return res.status(401).json({
          message: "unauthorized access",
        });
      }

      if (payload) {
        try {
          const user = await User.findByPk(payload.sub);

          if (!user) {
            return res.status(401).json({
              message: "unauthorized access",
            });
          }
          req.user = user.dataValues;
          next();
        } catch (err) {
          return res.status(500).json({
            message: (err as any).message,
          });
        }
      }
    }
  );
};

export default authenticate;