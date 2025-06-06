import express from "express";
import { handleGetUser, handleDeleteUser, handleChangePassword, getLoginHistory } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get('/', handleGetUser);
userRouter.post('/:id', handleDeleteUser);
userRouter.patch("/", handleChangePassword);
userRouter.get("/logins", getLoginHistory)

export default userRouter;