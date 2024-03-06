import { users } from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import { setUser } from '../service/auth.js'

async function handleUserRegister(req, res) {
    const body = req.body;
    if (!body.name || !body.email || !body.password) return res.status(400).send("Email and Password is required");
    await users.create({
        name: body.name,
        email: body.email,
        password: body.password
    });
    return res.render('login');
}

async function handleUserLogin(req, res) {
    const body = req.body;
    console.log(body);
    if (!body.email || !body.password) return res.status(400).send("Email and Password is required");
    const user = await users.findOne({ email: body.email });
    if (!user) return res.status(404).send("User not found");
    if (user.password !== body.password) return res.status(401).send("Password is incorrect");
    const sessionID = uuidv4();
    setUser(sessionID, user);
    res.cookie('uid',sessionID);
    return res.redirect('/');

}

export { handleUserRegister, handleUserLogin };