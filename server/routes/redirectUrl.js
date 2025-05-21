import express from "express";
import { handleGetRedirectUrl } from "../controllers/redirectUrl.controller.js"
const redirectUrlRouter = express.Router();

redirectUrlRouter.get('/:id', handleGetRedirectUrl)

export default redirectUrlRouter;