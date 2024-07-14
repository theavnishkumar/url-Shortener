import express from 'express';
import { loginRestrict, userAccountRestrict } from './middleware/auth.js';
import { router } from './routes/url.js';
import userRouter from './routes/user.js';
import mongoDBConnection from './connection.js';
import { urls } from './models/url.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config().parsed;

const app = express();
const port = process.env.PORT || 4000;


mongoDBConnection(process.env.MONGO_URL)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.log('Error: ', err); });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', userAccountRestrict, async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const showUrl = await urls.find({ createdBy: req.user._id });
    return res.render('index', { url: showUrl, id: req.user.name })
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
    const entry = await urls.findOneAndUpdate(
        { shortUrl },
        { $push: { clicks: { timestamp: Date.now() } } }
    );
    if (!entry) return res.render('error');
    res.redirect(entry.url);
})

app.use('/url', loginRestrict, router);
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});