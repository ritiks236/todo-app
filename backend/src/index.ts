import express, {Application, Request, Response} from "express";
const app: Application = express();
import rootRouter from "./routes";

app.use(express.json());

const PORT = 3000;

app.use('/api/v1', rootRouter);

app.get('/', (req :Request, res :Response) => {
    res.send('Welcome to express and Typescript server');
});

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
});