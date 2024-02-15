import express, {  Router } from "express";
const userRouter :Router =  require("./user");
// const todoRouter :Router 

const router :Router = express.Router();

router.use('/user', userRouter);
// router.use('/todo', todoRouter);

module.exports = router;