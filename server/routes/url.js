import express from "express"
import { handleGenerateUrl, handleDeleteUrl } from "../controllers/url.controller.js";
const urlRouter = express.Router();

urlRouter.post('/create', handleGenerateUrl);
urlRouter.delete('/', handleDeleteUrl);

export default urlRouter;