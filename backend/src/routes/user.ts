import express, { Router, Request, Response } from "express";
const router: Router = express.Router();
import zod from "zod";
import bcrypt from "bcrypt";

const signUpBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

router.post('/signup', (req :Request<{username: string, password :string}>, res :Response) => {
    const {success} = signUpBody.safeParse(req.body);

    if(!success){
        return res.status(404).json({
            message : "Incorrect Outputs"
        })
    }


})