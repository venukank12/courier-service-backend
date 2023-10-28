import express from "express";
import validate from "../utils/validations";
import { loginUserValidation,registerUserValidation } from "../utils/validations/user";
import EndPoints from "../utils/consents/endPoints";

// controllers
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";
import refreshToken from "../controllers/auth/refreshToken";

// middleware
import refresh from "../middlewares/refresh";

const router = express.Router();

router.post(EndPoints.REGISTER, validate(registerUserValidation), register);

router.post(EndPoints.LOGIN, validate(loginUserValidation), login);

router.post(EndPoints.REFRESH_TOKEN, refresh, refreshToken);

export default router;