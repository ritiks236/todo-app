import express, {  Router } from "express";
import userRouter from "./user";
import todoRouter from "./todo";

const router :Router = express.Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

export default router;