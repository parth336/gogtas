const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const loginRouter = require("./routes/login");
const dashboardRouter = require("./routes/dashboard");
const instituteRouter = require("./routes/institute");
const settingsRouter = require("./routes/settings");
const apiRouter = require("./routes/api");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./config/passportConfig");

initializePassport(passport);

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}



const app = express();

app.use("/assets", express.static(path.join(__dirname, 'assets')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

app.use(flash());
app.use(expressLayouts);
app.set("layout","./layouts/main");
app.set("view engine" , "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/dashboard",dashboardRouter);
app.use("/",loginRouter);
app.use("/institute",instituteRouter);
app.use("/settings",settingsRouter);
app.use("/api",apiRouter);
const PORT = process.env.PORT || 8080;



app.listen(PORT , ()=>{
    console.log(`server running on ${PORT}`);
})