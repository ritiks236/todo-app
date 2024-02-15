import express, { Router } from "express";
const router: Router = express.Router();
import zod from 'zod';

const todoBody = zod.object({
    title: zod.string(),
    description: zod.string()
})

module.exports = router;