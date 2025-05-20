import express from "express"
import { handleGenerateUrl, handleDeleteUrl, handleGetUrl } from "../controllers/url.controller.js";
const urlRouter = express.Router();

urlRouter.get('/', handleGetUrl);
urlRouter.post('/create', handleGenerateUrl);
urlRouter.delete('/:_id', handleDeleteUrl);

export default urlRouter;