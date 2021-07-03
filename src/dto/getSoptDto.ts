import mongoose from "mongoose"

export interface IGetSoptDto{
    _id : mongoose.Types.ObjectId
    part : String
    grade:String
}

export class GetSoptDto{
    private _id
    private part
    private grade

    constructor(_id : mongoose.Types.ObjectId, part : String, grade:String){
        this._id = _id
        this.part = part
        this.grade=grade
    }
}