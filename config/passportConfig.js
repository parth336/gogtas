const LocalStatergy = require("passport-local").Strategy;
const admin = require("../modules/admin")
const bcrypt = require("bcrypt");

function initialize(passport){
    const authenticateUser = async (email, password, done) => {
        try {
            let [users, _] = await admin.getByEmail(email);
            if(users.length){
                user = users[0];
                bcrypt.compare(password , user.password , (err,same)=>{
                if(same){
                    return done(null,user);
                }else{
                    return done(null, false , {message: "Password is incorrect!"})
                }
            })
            }else{
                return done(null, false, {message:"User not found!"});
            }    
        } catch (error) {
            console.log(error);
            done(error);
        }       
    }
    passport.use(new LocalStatergy({ usernameField : 'username'},authenticateUser))
    passport.serializeUser((user,done)=>{ done(null,user.id)})
    passport.deserializeUser(async (id,done)=>{
        try{
           let [users, _] = await admin.getById(id);
           done(null,users[0]);
        }catch(err){
            console.log(err);
            done (err,false)
        }
        
    })
}

module.exports = initialize;