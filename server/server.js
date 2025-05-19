import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./connection.js";
import urlRouter from "./routes/url.js";
import authRouter from "./routes/auth.js"
import userRouter from "./routes/user.js"
import { secureRoute } from "./middlewares/auth.js";



// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

connectDB();

app.use('/', authRouter);
app.use('/url/', secureRoute, urlRouter);
app.use('/user', secureRoute, userRouter)

app.get('/test', async (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
