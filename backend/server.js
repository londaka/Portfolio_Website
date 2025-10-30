import express from "express";
import cors from "cors";
import userRouter from "./src/routes/userRoute.js";
import connectDB from "./src/config/db.js";
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth/user", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
