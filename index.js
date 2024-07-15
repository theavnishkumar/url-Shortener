import express from 'express';
import { loginRestrict, userAccountRestrict } from './middleware/auth.js';
import { router } from './routes/url.js';
import userRouter from './routes/user.js';
import mongoDBConnection from './connection.js';
import { urls } from './models/url.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config().parsed;

const app = express();
const port = process.env.PORT || 4000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoDBConnection(process.env.MONGO_URL)
    .then(() => { console.log('Connected to MongoDB'); })
    .catch((err) => { console.log('Error: ', err); });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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