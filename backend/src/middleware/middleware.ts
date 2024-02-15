import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    userId ?:string
}

type AuthMiddlewareFunction = (req: CustomRequest, res: Response, next: NextFunction) => void;


export const authMiddleware :AuthMiddlewareFunction = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json("Unauthorized - Token Not found")
    }

    const token = authHeader.split(' ')[1];

    try{

        const decoded =  jwt.verify(token, JWT_SECRET) as {userId :string};
        req.userId = decoded.userId

        next();
    } catch(err){
        return res.status(411).json("Internal Server Error - Error in token");
    }
}
