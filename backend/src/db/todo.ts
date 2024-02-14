import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface TodoParams{
    title: string,
    description: string
}

export async function createTodo(userId: number, {title, description}: TodoParams) {
    const res = prisma.todo.create({
        data:{
            title,
            description,
            userId: userId,
            done: false
        }
    })

    return res;
}

export async function markDoneTodo(todoId : number) {
   const res = await prisma.todo.update({
    where: {
        id: todoId
    },
    data:{
        done: true
    }
   })

   return res;
}

export async function getTodo(userId: number) {
    const res = await prisma.todo.findMany({
        where:{
            userId: userId,
            done: false
        }
    });

    return res;
}