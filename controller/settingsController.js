const admin = require("../modules/admin")
const passport = require("passport")
const bcrypt = require("bcryptjs")


module.exports = {
    get:(req, res)=>{
        res.render("../views/settings",{title:"Settings",header:"Settings",username:`${req.user.firstname} ${req.user.lastname}`,sidebar:"settings",user:req.user})
    },

    checkPassword:async (req,res)=>{
        try {
            let body = req.body;
            let same = await bcrypt.compare(body.password,req.user.password)
            res.status(200).json({message:"Password check.",exist:same});

        } catch (error) {
            console.log(error);
            res.status(500).json({message:"There is some server error."})
        }
    },
    changePassword: async (req,res)=>{
        const body = req.body;
        let password = body.password;
        try{
            let hash = await bcrypt.hash(password,7)
            let [users, _ ] = await admin.updatePassword(hash,req.user.email);
            res.status(200).json({message:"Password changed successfully."})
        }catch(err){
            console.log(err);
            res.status(500).json({message:"There is some server error."})
        } 
    },
    updateProfile: async (req,res)=>{
        const body = req.body;
        try {
            body.id = req.user.id;
            let [response, _] = await admin.updateProfile(body);
            res.status(200).json({message:"User profile updated."})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"There is some server error."})
        }
    }
    
}