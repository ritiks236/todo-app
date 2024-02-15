import express, { Router, Request, Response } from "express";
const todoRouter: Router = express.Router();
import zod from 'zod';
import { authMiddleware } from "../middleware/middleware";

const todoBody = zod.object({
    title: zod.string(),
    description: zod.string()
})

todoRouter.post('/createtodo', authMiddleware, async(req :Request, res :Response) => {

})

export default todoRouter;