import express from "express"
import User from "../models/User"
import School from "../models/School"
import Sopt from "../models/Sopt"
import { GetUserNameDto } from "../dto/getUserNameDto"
import { GetUserInfoDto } from "../dto/getUserInfoDto"
import { GetSoptUnivInfoDto } from "../dto/getSoptUnivInfo"
import { IUser } from "../interfaces/IUser"
import { ISchool } from "../interfaces/ISchool"
import { GetSchoolDto } from "../dto/getSchoolDto"
require("../models/School")
require("../models/User")
require("../models/Sopt")


const router = express.Router()

router.post("/user",async(req,res)=>{
    
    try{
        
        const user1=new User();
        const school1=new School();
        const sopt1=new  Sopt();
        
        //console.log("text",text);
        sopt1.part=req.body.part;
        sopt1.grade=req.body.grade;
        await sopt1.setUser(user1._id);

        await school1.setName(req.body.schoolName);
        await school1.setUser(user1._id);

        user1.name=req.body.userName;
        await user1.setSchool(school1);
        await user1.setSopt(sopt1);

        console.log("Sopt: ",sopt1);
        console.log("User: ",user1);
        console.log("Univ: ",school1);

        res.json({
            "status":200,
            "message":"연결성공",
            "data": sopt1,user1,school1
        })

    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
        }
    });

router.get("/user/:id",async(req,res)=>{
    try{
        const user= await User.findById(req.params.id).populate('sopt','_id part');//한번에 가능
        const soptMember=user.sopt;
        console.log(user);

        res.json({
            "status":200,
            "message":"연결성공",
            "data": soptMember
        })
    }catch(error)
    {
        console.error(error.message);
        res.json({
            "status":500,
            "message":"Server Error"
        });
    }
});

router.get("/userDetail/:id",async(req,res)=>{
try{
    const userS=await User.findById(req.params.id).populate('sopt').populate('school');
    
    const userSopt=await new Sopt(userS.sopt);
    const userUniv=await new School(userS.school);
    
    const userData=await new GetSoptUnivInfoDto(userS,userSopt,userUniv);
    console.log("userData : ",userData);

    res.json({
        "status":200,
        "message":"연결성공",
        "data":userData
    })
}catch(error){

        console.error(error.message);
        res.json({
        "status":500,
        "message":"Server Error"
    })
}
});

module.exports = router;