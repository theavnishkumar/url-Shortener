import express from "express";
import { handleUserSignup, handleUserLogin, handleUserLogout } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/login", handleUserLogin);
authRouter.post("/signup", handleUserSignup);
authRouter.post("/logout", handleUserLogout);

export default authRouter;