import { query } from "express-validator";

export const page = query("page")
  .if(query("page").exists())
  .notEmpty()
  .withMessage("page can not be null")
  .isInt()
  .withMessage("page should be number");

export const pageSize = query("pageSize")
  .if(query("pageSize").exists())
  .notEmpty()
  .withMessage("page size can not be null")
  .isInt()
  .withMessage("page size should be number");

  export const search = query("search")
  .if(query("search").exists())
  .notEmpty()
  .withMessage("search can not be null")
  .isString()
  .withMessage("search should be string");

