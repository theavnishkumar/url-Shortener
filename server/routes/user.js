import express from "express";
import { handleGetUser, handleDeleteUser } from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get('/', handleGetUser);
userRouter.post('/:id',handleDeleteUser);

export default userRouter;