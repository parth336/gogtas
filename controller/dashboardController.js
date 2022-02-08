module.exports = {
 get:(req,res)=>{
     res.render("../views/dashboard",{title:"Dashboard",header:"Dashboard",username:`${req.user.firstname} ${req.user.lastname}`,sidebar:"dashboard"})
 }
}