import express from "express";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { getAdminDashboard } from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.get("/", checkAdmin, getAdminDashboard);

export default adminRouter;
