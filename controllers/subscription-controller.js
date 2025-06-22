import Subscription from '../models/subscription-model.js';


export const listAllSubscriptions = async (req,res,next) => {
    try {
        const allSubscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            message: 'Successfully fetched all subscriptions',
            data: allSubscriptions
        });
    } catch (error) {
        console.log('Failed to fetch all subscriptions');
        next(error);
    }
}

export const createSubscription = async (req,res,next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })
        res.status(201).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error);
    }
}

export const getUserSubscriptions = async(req,res,next) => {
    try {
        if(req.user.id !== req.params.id){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized, Please log in with correct account'
            });
        };
        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            message: 'All subscriptions fetched sucessfully',
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
}

export const cancelSubscription = async(req,res,next) => {
    try {
        const subscription = await Subscription.findById(req.params.id)
        if(!subscription){
            return res.status(404).json({
                success: false,
                message: 'Subscription not found'
            });
        } else{
            const { status }  = req.body;
            const userId = req.params.id;
            const updatedSub = await Subscription.findByIdAndUpdate(userId, { status }, { new: true });
            res.status(200).json({
                success: true,
                message: 'Subscription has been cancelled successfully',
                data: updatedSub
            })
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Failed to cencel the subscription please try again',
        });
        next(error)
    };
}

export const getASubscription = async(req,res,next) => {
    try {
        const userId = req.params.id;
        const findSubscription = await Subscription.findById(userId);
        if(!findSubscription){
            return res.status(404).json({
                success: false,
                message: 'No Subscription found',
            });
        } else{
            res.status(200).json({
                success: true,
                message: 'Successfully fetched subscriptions',
                data: findSubscription
            });
        };
        
    } catch (error) {
        console.error("Failed:", error)
        res.status(404).json({
            success: false,
            message: "Failed to fetch Subscription"
        });
        next(error);
    };
}