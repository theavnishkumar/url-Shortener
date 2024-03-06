import express from 'express';
import {handleGenerateUrl, handleDeleteUrl} from '../controllers/url.js';
const router = express.Router();


router.post('/', handleGenerateUrl);
router.delete('/:id', handleDeleteUrl);

export {router};