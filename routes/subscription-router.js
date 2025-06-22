import { Router } from "express";
import authorize from "../middleware/auth-middleware.js";
import { cancelSubscription, createSubscription, getASubscription, getUserSubscriptions, listAllSubscriptions } from '../controllers/subscription-controller.js';
import isAdmin from "../middleware/admin-middleware.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/all',authorize, isAdmin, listAllSubscriptions);

subscriptionRouter.get('/SubDetails/:id', authorize, isAdmin, getASubscription);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/cancel/:id', authorize, isAdmin, cancelSubscription);

export default subscriptionRouter;