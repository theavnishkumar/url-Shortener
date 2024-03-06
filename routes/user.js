import express from 'express';
const userRouter = express.Router();
import { handleUserRegister, handleUserLogin } from '../controllers/user.js';
import {loginRestrict} from '../middleware/auth.js';

userRouter.post('/', handleUserRegister);
userRouter.post('/login', handleUserLogin);
userRouter.get('/logout', (req, res) => {
    res.clearCookie('uid');
    res.redirect('/login');
});
userRouter.get('/report', loginRestrict ,(req, res) => {
    res.render('report');
});

export default userRouter;