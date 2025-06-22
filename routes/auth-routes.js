import { Router } from "express";
import { signIn, signUp } from "../controllers/auth-controllers.js";
const authRouter = Router();

authRouter.post('/signup', signUp);

authRouter.post('/signin', signIn);

authRouter.post('/signout', (req,res) => {
    res.send({title: 'Sign-out'})
});

export default authRouter;