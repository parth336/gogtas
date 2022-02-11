const instituteModel = require("../modules/institute");
const usersModel = require("../modules/users");
const fs = require("fs");
const csvParser = require("csv-parser");

module.exports = {
    get:async (req, res)=>{
        let [institutes, _] = await instituteModel.getAll();
        res.render("../views/institute",{title:"Add institute",header:"Dashboard",username:`${req.user.firstname} ${req.user.lastname}`,sidebar:"institute",institutes:institutes})
    },
    post:async (req,res)=>{
        let body = req.body;
        try {
            let institute = await instituteModel.add(req.body)
            let insertId = institute[0].insertId
            let [institutedata, _] = await instituteModel.getById(insertId);
            res.status(200).json({message:"Institute Added successfuly.",data:institutedata});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Something went wrong."})
        }
        
    },
    chageStatus:async (req,res)=>{
        let body = req.body;
        try {
            let institute = await instituteModel.changeStatus(body.id,body.status);     
            res.status(200).json({message:"Status changed successfully."})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Something went wrong."})
        }
    },
    delete: async (req,res)=>{
        let body = req.body;
        try {
            let institute = await instituteModel.delete(body.id)
            res.status(200).json({message:"Institute deleted successfully"});    
        } catch (error) {
            res.status(500).json({message:"Something went wrong."})
        }
    },
    getInstitute: async(req,res)=>{
        let body = req.body;
        try {
            let [institute, _] = await instituteModel.getById(body.id);
            res.status(200).json({message:"Get institute by id.",institute:institute})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Something went wrong."});
        }
    },
    exist: async (req,res)=>{
        let domain = req.params.domain;
        try{
            let [institute, _] = await instituteModel.getByDomain(domain);
            res.status(200).json({message:"Get institute by email.",institute:institute})
        }catch(err){
            console.log(err);
            res.status(500).json({message:"Something went wrong."});
        }

    },
    getCount: async(req,res)=>{
        try{
            let [institutes, _] = await instituteModel.getAll();
            res.status(200).json({message:"get all institutes" , institutesCount: institutes.length})
        }catch(error){
            console.log(error);
            res.status(500).json({message:"Something went wrong."});
        }
    },
    update: async (req,res)=>{
        try {
            let body = req.body;
            let institute = await instituteModel.update(body,body.id);
            let [institutedata, _] = await instituteModel.getById(body.id);
            res.status(200).json({message:"Institute updated successfully",data:institutedata})
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Something went wrong."});
        }
    },
    users: async(req,res)=>{
        try {
            let id = req.params.id;
            let [users, _] = await usersModel.getByInstituteId(id);
            res.render("users",{title:"Users",header:"Users",username:`${req.user.firstname} ${req.user.lastname}`,sidebar:"institute",users:users})    
        } catch (error) {
            console.log(error);
            throw new error;
        } 
    },
    addUser: async(req,res)=>{
        try{
            let body = req.body;
            let user = await usersModel.add(body)
            let insertId = user[0].insertId;
            let [userData, _] = await usersModel.getById(insertId);
            res.status(200).json({status:true,user:userData});
        }catch(error){
            console.log(error);
            res.status(500).json({message:"Something went wrong."});
        }
    },
    changeUserStatus: async (req,res)=>{
        try {
            let body = req.body;
            let user = usersModel.chageStatus(body.id,body.status);
            res.status(200).json({status:true,message:"Status chaged."});
        } catch (error) {
            console.log(error);
            res.status(500).json({status:false,message:"Server error"});
        }
    },
    uploadUser:async (req,res)=>{
        try {
            let institute = req.body.institute;
            let files = req.files;
            let csv = files.file;
            let id = new Date().getTime();
            csv.mv("./assets/temp"+csv.name+id,function (err,data){
                if(err){
                    console.log(err);
                }else{
                    let results = [];
                    fs.createReadStream("./assets/temp"+csv.name+id)
                    .pipe(csvParser())
                    .on("data",(data)=>{
                        results.push(data);
                    }).on("end",async ()=>{
                        let users = await usersModel.uploadUsers(results,institute);
                        console.log(users);
                        fs.rm("./assets/temp"+csv.name+id,(err)=>{
                            if(err) console.log(err);
                            res.status(200).json({status:true,message:"Users uploaded successfully"});
                        });
                    })
                }
            });
            

        } catch (error) {
            
        }
    }
    
}