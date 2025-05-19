import express from "express";
import { handleUserSignup, handleUserLogin, handleUserLogout } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/auth/login", handleUserLogin);
authRouter.post("/auth/signup", handleUserSignup);
authRouter.post("/auth/logout", handleUserLogout);

export default authRouter;