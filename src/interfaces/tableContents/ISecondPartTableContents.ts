import mongoose,{Document, Model} from "mongoose"
import {IUserDiary} from "../diary/IUserDiary"

export interface ISecondPartTableContents extends Document{
    _id : mongoose.Types.ObjectId;
    chapter : Number;
    title : String;
    contents : String;
    userDiary : [IUserDiary];
}

export interface ISecondPartTableContentsDocument extends ISecondPartTableContents{
    setUserDiary : (petDiary : IUserDiary) => Promise<void>
}

export interface ISecondPartTableContentsModel extends Model<ISecondPartTableContentsDocument>{
    
}