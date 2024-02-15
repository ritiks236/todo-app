import express, {  Router } from "express";
import userRouter from "./user";
import todoRouter from "./todo";

const rootRouter :Router = express.Router();

rootRouter.use('/user', userRouter);
rootRouter.use('/todo', todoRouter);

export default rootRouter;