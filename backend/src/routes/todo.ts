import express, { Router, Request, Response } from "express";
const todoRouter: Router = express.Router();
import zod from 'zod';
import { authMiddleware } from "../middleware/middleware";
import { createTodo, deleteTodo, getTodo, markDoneTodo } from "../db/todo";

const todoBody = zod.object({
  title: zod.string(),
  description: zod.string()
})

interface CustomRequest extends Request {
  userId?: string
}


todoRouter.post('/createtodo', authMiddleware, async (req: CustomRequest, res: Response) => {
  const { success } = todoBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json("Incorrect Inputs");
  }

  const { title, description } = req.body;
  const userId: number = Number(req.userId)

  const result = await createTodo(userId, { title, description });

  if (result) {
    return res.status(200).json({
      message: "Todo Created Successfully"
    })
  }

  return res.status(411).json("Error in Todo creation");
});


todoRouter.put('/done', authMiddleware, async (req: CustomRequest, res: Response) => {
  const todoId: string = req.query.id as string;

  const result = await markDoneTodo(Number(todoId));

  if (result) {
    return res.status(200).json("Todo completed");
  }

  return res.status(411).json("Error in Mark as Done, Pls try again!");
});

todoRouter.get('/todos', authMiddleware, async (req: CustomRequest, res: Response) => {
  const userId = req.userId

  const result = await getTodo(Number(userId));

  if (result) {
    return res.status(200).json({
      todos: result
    });
  }

  return res.status(411).json("Can't get all the todos, Pls try again!");
});

todoRouter.delete('/delete', authMiddleware, async (req: CustomRequest, res: Response) => {
  const todoId: string = req.query.id as string;

  const result = await deleteTodo(Number(todoId));

  if (result) {
    return res.status(200).json("Todo Deleted");
  }

  return res.status(411).json("Error in Deleting, Pls try again!");
});

export default todoRouter;
