import express from "express"
import { handleGenerateUrl, handleDeleteUrl, handleGetUrl, getUrlAnalytics } from "../controllers/url.controller.js";
const urlRouter = express.Router();

urlRouter.get('/', handleGetUrl);
urlRouter.post('/create', handleGenerateUrl);
urlRouter.delete('/:_id', handleDeleteUrl);
urlRouter.get('/analytics', getUrlAnalytics);

export default urlRouter;