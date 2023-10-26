import express from "express";
import validate from "../utils/validations";
import { loginUserValidation,registerUserValidation } from "../utils/validations/user";

// controllers
import register from "../controllers/auth/register";
import login from "../controllers/auth/login";

const router = express.Router();

router.post("/register", validate(registerUserValidation), register);

router.post("/login", validate(loginUserValidation), login);

export default router;