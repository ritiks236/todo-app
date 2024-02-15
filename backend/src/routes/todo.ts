import express, { Router } from "express";
const todoRouter: Router = express.Router();
import zod from 'zod';

const todoBody = zod.object({
    title: zod.string(),
    description: zod.string()
})

export default todoRouter;