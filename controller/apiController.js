const bcrypt = require("bcrypt");
const admin = require("../modules/admin");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");
const apiModule = require("../modules/apiModule");

module.exports = { 
    post: async (req,res)=>{
        let body = req.body;
        let email = body.email;
        let password = body.password;
        try {
            let [users, _] = await admin.getByEmail(email);
            if(users.length){
                user = users[0];
                bcrypt.compare(password , user.password , async (err,same)=>{
                if(same){
                    let accessToken = await jwtConfig.generateAccessToken({user:email});
                    let refreshToken = jwt.sign({user:email},process.env.REFRESH_TOKEN_SECRET)
                    let token = await apiModule.addRefreshToken(refreshToken);
                    res.status(200).json({error:false,accessToken:accessToken,refreshToken:refreshToken});
                }else{
                    res.status(403).json({error:true,message:"Password is incorrect!!"})
                }
            })
            }else{
                res.status(403).json({error:true,message:"User not found!!"})
            }    
        } catch (error) {
            console.log(error);
            done(error);
        } 
    },
    token: async(req,res)=>{
        let token = req.body.token;
        if(token == null) res.status(401).json({error:true,message:"Refresh token not found"});
        let [toeken, _] = await apiModule.getToken(token);
        if(token.length){
            jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
                if(err) {
                    res.status(500).json({error:true,message:"Error while verifiying token!!"});
                }else{
                    let accessToken = jwtConfig.generateAccessToken({user:user.email});
                    res.status(200).json({error:false,accessToken:accessToken});
                }
            })
        }else{
            res.status(401).json({error:true,message:"Refresh token is not valid!!"})
        }
    },
    isAuthenticated: async(req,res)=>{
        try {
            let body = req.body;
            if(body.email){ 
                let [users, _] = await apiModule.isAuthenticated(body);
                if(users.length){
                    res.status(200).json({error:false,hasAccess:true})
                }else{
                    res.status(200).json({error:false,hasAccess:false});
                }
            }else{
                res.status(400).json({errpr:true,message:"Bad request please provide email!!"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({error:true,message:"Internal server Error while getting user access!!"});
        }
    }
}