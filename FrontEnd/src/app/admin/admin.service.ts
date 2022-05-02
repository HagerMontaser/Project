import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../_models/event';
import { Login } from '../_models/login';
import { Loginresponse } from '../_models/loginresponse';
import { Speaker } from '../_models/speaker';
import { Student } from '../_models/student';
import * as mongoose from "mongoose";


@Injectable({
  providedIn: 'root'
})

export class AdminService {
  baseUrl="http://localhost:8080/";

  constructor(public http:HttpClient) { }
  //set token in header
  header = new HttpHeaders().set(
    "Authorization",localStorage.getItem("token")??"undefined"
  );
  //admin login
  getLoginResponse(log:Login){
    return this.http.post<Loginresponse>(this.baseUrl+"login",log);
  }
  //get all events
  getEventsList(){
    return this.http.get<Event[]>(this.baseUrl+"events",{headers:this.header});
  }
  //get event by id 
  getEventById(id:number){
    return this.http.get<Event>(this.baseUrl+"events/"+id,{headers:this.header});
  }
  //add new event
  addNewEvent(event:Event){
    return this.http.post<Event>(this.baseUrl+"events",event,{headers:this.header});
  }
  //delete event
  deleteEvent(id:number){
    return this.http.delete<Loginresponse>(this.baseUrl+"events/"+id,{headers:this.header});
  }
  //edit event
  editEvent(event:Event){
    return this.http.put<Loginresponse>(this.baseUrl+"events",event,{headers:this.header});
    
  }
  //get all speakers
  getSpeakersList(){
    return this.http.get<Speaker[]>(this.baseUrl+"speakers",{headers:this.header});
  }
  //get speaker by id
  getSpeakerById(id:mongoose.Types.ObjectId){
    return this.http.get<Speaker>(this.baseUrl+"speakers/"+id,{headers:this.header});
  }
  //delete speaker
  deleteSpeaker(id:mongoose.Types.ObjectId){
    return this.http.delete<Loginresponse>(this.baseUrl+"speakers/"+id,{headers:this.header});
  }
  //edit speaker
  editSpeaker(speaker:Speaker){
    return this.http.put<Loginresponse>(this.baseUrl+"speakers",speaker,{headers:this.header});
  }

  //get all students
  getStudentsList(){
    return this.http.get<Student[]>(this.baseUrl+"students",{headers:this.header});
  }

  //get student by id
  getStudentById(id:number){
    return this.http.get<Student>(this.baseUrl+"students/"+id,{headers:this.header});
  }
  //delete student
  deleteStudent(id:number){
    return this.http.delete<Loginresponse>(this.baseUrl+"students/"+id,{headers:this.header});
  }
   //edit student
  editStudent(student:Student){
    return this.http.put<Loginresponse>(this.baseUrl+"students",student,{headers:this.header});
  }
}
