import { NextFunction, Request, Response } from "express";
import { validationResult,ValidationChain } from "express-validator";

const validate = (validations:ValidationChain[]) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const resErr:string[] = [];
    errors.array().map((e) => resErr.push(e.msg));
    return res
      .status(400)
      .json({ message: "validation failed", error: resErr });
  };
};

export default validate;