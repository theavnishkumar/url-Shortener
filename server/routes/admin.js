import express from "express";
import { checkAdmin } from "../middlewares/checkAdmin.js";
const adminRouter = express.Router();

adminRouter.get('/', checkAdmin, (req, res) => {
    res.send("Hello admin")
})

export default adminRouter;