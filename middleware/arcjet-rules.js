import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req,res,next) => {
    try {
        const decision = await aj.protect(req, {requested: 1 });
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({
                    success: false,
                    message: 'Too many requests'
                });
            };
            if(decision.reason.isBot()){
                return res.status(403).json({
                    success: false,
                    message: 'Bot Detected'
                });
            };
            return res.status(403).json({
                error: 'Access denied'
            });
        };
        next();
    } catch (error) {
        console.log(`Arcjet Middleware error: ${error}`);
        next(error);
    };
}

export default arcjetMiddleware;