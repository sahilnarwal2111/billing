import jwt from 'jsonwebtoken'
import JWT_SECRET from './config.js'

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({msg : "Invalid JWT Token !"});
        return
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        
        if(decoded.UserId){
            req.body.UserId = decoded.UserId;
            next();
        }
        else{
            return res.status(403).json({msg : "Invalid JWT Token"})
        }
    }
    catch(err){
        console.error("JWT error:", err.message);
        return res.status(403).json({msg : "Invalid JWT Token"})
    }
} 

export { authMiddleware }
