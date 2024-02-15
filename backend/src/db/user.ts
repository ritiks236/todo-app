import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface UserParams{
    username: string,
    password: string
}

interface NameParams{
    firstName: string,
    lastName: string
}

export async function createUser({username, password}: UserParams,
                                 {firstName, lastName}: NameParams) {
    const res = await prisma.user.create({
        data : {
            username,
            firstName,
            lastName,
            password
        }, 
        select:{
            id: true
        }
    });

    return res;
}

export async function findUser(username:string) {
    const res = await prisma.user.findUnique({
        where:{
            username: username
        },
        select:{
            id : true,
            password: true
        }
    });

    return res;
}

