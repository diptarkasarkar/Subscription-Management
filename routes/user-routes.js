import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user-controller.js";
import authorize from "../middleware/auth-middleware.js";
import isAdmin from "../middleware/admin-middleware.js"
const userRouter = Router();

userRouter.get('/', authorize, isAdmin, getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.put('/update/:id', authorize, isAdmin, updateUser);

userRouter.delete('/delete/:id', authorize, isAdmin, deleteUser);

export default userRouter;