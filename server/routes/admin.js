import express from "express";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { getAdminDashboard, getAllUsers, getUserUrls } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.get("/", checkAdmin, getAdminDashboard);
adminRouter.get("/users", checkAdmin, getAllUsers);
adminRouter.get("/users/:userId/urls", checkAdmin, getUserUrls);

export default adminRouter;
