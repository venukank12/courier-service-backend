import express from "express";
import validate from "../utils/validations";
import { loginUserValidation,registerUserValidation } from "../utils/validations/user";

// controllers
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import EndPoints from "../utils/consents/endPoints";

const router = express.Router();

router.post(EndPoints.REGISTER, validate(registerUserValidation), register);

router.post(EndPoints.LOGIN, validate(loginUserValidation), login);

export default router;