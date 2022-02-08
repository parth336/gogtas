const admin = require("../modules/admin")
const passport = require("passport")


module.exports = {
    get:(req, res)=>{
        res.render("../views/index",{layout:"layouts/login",title:"Login"})
    },
    post: passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/',
            failureFlash: true
    }),
    logout: (req, res) => {
        req.logout();
        res.redirect("/");
    }
}