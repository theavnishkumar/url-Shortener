import express from "express";
import { handleGetUser, handleDeleteUser, handleChangePassword } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get('/', handleGetUser);
userRouter.post('/:id', handleDeleteUser);
userRouter.patch("/", handleChangePassword);

export default userRouter;