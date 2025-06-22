import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user-routes.js';
import authRouter from './routes/auth-routes.js';
import subscriptionRouter from './routes/subscription-router.js';
import connectToDB from './database/mongodb.js';
import errorMiddleware from './middleware/error-middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middleware/arcjet-rules.js';

const app = express();
app.use(express.json()); //Adding built-in express middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(arcjetMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

//Adding custom middlewares
app.use(errorMiddleware);


app.get('/', (req,res) => {
    res.send('Welcome to the subscription Tracker API!');
});

app.listen(PORT, async () => {
    console.log(`Ther server is starting at port: ${PORT}`);
    await connectToDB();
});

export default app;