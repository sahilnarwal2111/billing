const jwt = require('jsonwebtoken');
const JWT_SECRET = require('./config')
const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(403).json({msg : "Invalid JWT Token !"});
        return
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        
        if(decoded.userId){
            req.body.userId = decoded.userId;
            console.log("Decoded User Id : " + decoded.userId)
            console.log("Attached to body " + req.body.userId)
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

module.exports = {
    authMiddleware
}
