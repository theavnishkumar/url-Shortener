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
import redirectUrlRouter from "./routes/redirectUrl.js";
import contactRouter from "./routes/contact.js";
import adminRouter from "./routes/admin.js";

connectDB();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));

app.use('/redirect/', redirectUrlRouter);
app.use('/auth/', authRouter);
app.use('/url/', secureRoute, urlRouter);
app.use('/user/', secureRoute, userRouter)
app.use('/admin', secureRoute, adminRouter)
app.use('/contact', contactRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
