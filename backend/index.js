import express from "express";
import { connectDatabase } from "./connection/database.js";
import { configDotenv } from "dotenv";
import blogRouter from "./routes/blog.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import commentRouter from "./routes/comment.routes.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
configDotenv();
connectDatabase();
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
