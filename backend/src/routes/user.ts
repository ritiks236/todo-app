import express, { Router, Request, Response} from "express";
const router: Router = express.Router();
import zod from "zod";
import bcrypt from "bcrypt";
import { createUser, findUser } from "../db/user";

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

router.post('/signup', async(req :Request, res :Response) => {
    const {success} = signUpBody.safeParse(req.body);

    if(!success){
        return res.status(404).json({
            message : "Incorrect Outputs"
        })
    }
    
    const {username, password, firstName, lastName} = req.body;

    const existingUser = await findUser(username);

    if(existingUser){
        return res.status(411).json({
            message : "user already exists"
        })
    }

    const hashedPassword :string = await bcrypt.hash(password, 10);

    const user = await createUser({username, password}, {firstName, lastName});

    console.log(user.id);
    return res.status(200).json('Signed Up Successfully');
});

router.post('/signin', async(req :Request, res :Response) => {
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

    bcrypt.compare(password, existingUser.password, (err, data) => {
        if(err){
            return res.status(411).json({
                message : "Error",
                error : err
            })
        }
        if(data){
            return res.status(200).json({
                message : "Logged In successfully"
            })
        }
        else{   
            return res.status(411).json({
                message : "password doesnot match"
            })
        }
    })
});

module.exports = router;