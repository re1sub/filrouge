import { Router } from "express";
import { login, register, verify } from "../controllers/authController.js";
import { validate } from "../middlewares/validationMiddleware.js";
import { loginSchema, registerSchema } from "../validations/authValidation.js";

const router = Router();

// POST /api/auth/register
router.post("/register", validate(registerSchema), register);

// GET /api/auth/verify/:token
router.get("/verify/:token", verify);

// POST /api/auth/login
router.post("/login", validate(loginSchema), login);

export default router;
