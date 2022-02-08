const res = require("express/lib/response");
let jwt = require("jsonwebtoken");

module.exports = {
    generateAccessToken: (user)=>{
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn : "30m" })
    },
    autheticateToken: (req, res, next)=>{
        const authHeader = req.headers["authorization"];
        let token = authHeader && authHeader.split(" ")[1];
        if(token == null) res.status(401).json({error:true,message:"Authorization token not found"});
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
            if(err) {
                res.status(403).json({error:true,message:"Token expired!!"});
            }
            req.user = user;
            next();
        })
    }
}