import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();

// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/user', authRouter)
app.use('/api/products', productRouter)

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});