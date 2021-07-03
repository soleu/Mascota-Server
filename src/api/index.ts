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
    const {text}=req.body;
    try{
        //const sopt1=await new Sopt().setUser()
        //const user1=await new User()

    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Error");
        }
    });

router.get("/user/:id",async(req,res)=>{
    try{
        const user= await User.findById(req.params.id).populate('sopt','_id part');
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
    //어캐 자름?_?
    const userInfo=await User.findById(req.params.id);
    const userS=await User.findById(req.params.id).populate('sopt');
    const userSopt=await new Sopt(userS.sopt);

    const userU=await User.findById(req.params.id).populate('school');
    const userUniv=await new School(userU.school);

    const userData=await new GetSoptUnivInfoDto(userInfo,userSopt,userUniv);
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