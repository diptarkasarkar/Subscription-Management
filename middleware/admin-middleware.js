const isAdmin = (req,res,next) => {
    if(req.user.role !== 'Admin'){
        return res.status(403).json({
            success: false,
            message: 'Request rejected, Admin permission required'
        });
    } 
    next();
}

export default isAdmin;