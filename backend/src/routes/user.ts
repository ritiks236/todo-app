import express, { Router, Request, Response} from "express";
const userRouter: Router = express.Router();
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { createUser, findUser } from "../db/user";
import { JWT_SECRET } from "../config";

const signUpBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
});

const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post('/signup', async(req :Request, res :Response) => {
    const {success} = signUpBody.safeParse(req.body);

    if(!success){
        return res.status(404).json({
            message : "Incorrect Inputs"
        })
    }
    
    const {username, password, firstName, lastName} = req.body;

    const existingUser = await findUser(username);

    if(existingUser){
        return res.status(411).json({
            message : "user already exists"
        })
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const user = await createUser({username, hashedpassword}, {firstName, lastName});

    const userId = user.id;
    const token = jwt.sign({userId}, JWT_SECRET)
    
    return res.status(200).json({
        message : 'Signed Up Successfully',
        token : token
    });
});

userRouter.post('/signin', async(req :Request, res :Response) => {
    const {success} = signInBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Incorrect Inputs"
        })
    }

    const {username, password} = req.body;

    const existingUser = await findUser(username);

    if(!existingUser){
        return res.status(411).json({
            message : "User doesn't exist"
        })
    }

    const userId = existingUser.id;

    bcrypt.compare(password, existingUser.password, (err, data) => {
        if(err){
            return res.status(411).json({
                message : "Error",
                error : err
            })
        }
        if(data){
            const token = jwt.sign({userId}, JWT_SECRET);
            return res.status(200).json({
                message : "Logged In successfully",
                token : token
            })
        }
        else{   
            return res.status(411).json({
                message : "password doesnot match"
            })
        }
    })
});

export default userRouter;