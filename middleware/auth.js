import { getUser } from "../service/auth.js";

async function loginRestrict(req, res, next) {
    const userSessionID = req.cookies?.uid;
    if (!userSessionID) return res.redirect('/login');
    const user = getUser(userSessionID);
    if (!user) return res.redirect('/login');
    req.user = user;
    next();
}

async function userAccountRestrict(req, res, next) {
    const userSessionID = req.cookies?.uid;
    const user = getUser(userSessionID);
    req.user = user;
    next();
}

export { loginRestrict, userAccountRestrict };