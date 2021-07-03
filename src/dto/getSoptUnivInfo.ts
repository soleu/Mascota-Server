import mongoose from "mongoose"
import { GetSchoolDto } from "./getSchoolDto"
import { GetUserInfoDto } from "./getUserInfoDto"
import { GetSoptDto } from "./getSoptDTO"
import { ISchool } from "../interfaces/ISchool"
import { IUser } from "../interfaces/IUser"
import {ISopt} from "../interfaces/ISopt"

export class GetSoptUnivInfoDto{
    private name
    private part
    private univ

    constructor(user : IUser , sopt:ISopt, school : ISchool){
        this.name = user.name
        this.part = sopt.part
        this.univ = school.name
    }
}