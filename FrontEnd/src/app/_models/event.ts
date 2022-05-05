import * as mongoose from "mongoose";

export class Event {
    constructor(public _id:number,
                public Title:string,
                public EventDate:string,
                public MainSpeakerId:mongoose.Types.ObjectId[],
                public OtherSpeakers:mongoose.Types.ObjectId[],
                public Students:number[]){

    }
}
