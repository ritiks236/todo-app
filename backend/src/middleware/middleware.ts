import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";

export const authMiddleware = async(req :Request, res :Response, next :NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(404).json("Token Not found")
    }

    const token = authHeader.split(' ')[1];

    try{

        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)

        next();
    } catch(err){
        return res.status(411).json("Error in token");
    }
}
