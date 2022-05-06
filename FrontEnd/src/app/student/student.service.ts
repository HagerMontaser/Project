import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../_models/event';
import { Login } from '../_models/login';
import { Loginresponse } from '../_models/loginresponse';
import { Student } from '../_models/student';

@Injectable({
    providedIn: 'root'
  })
  export class StudentService  {
    baseUrl="http://localhost:8080/";
    constructor(public http:HttpClient) { }
    //set token in header
    header = new HttpHeaders().set(
      "Authorization",localStorage.getItem("token")??"undefined"
    );
  
    //speaker login
    getLoginResponse(log:Login){
      return this.http.post<Loginresponse>(this.baseUrl+"login",log);
    }
    //student register
    registerStudents(student:Student){
      return this.http.post<Loginresponse>(this.baseUrl+"registerstudent",student);
    }
    //get student profile
    getStudentProfile(){
      return this.http.get<Student>(this.baseUrl+"students",{headers:this.header});
    }
    //edit speaker
    editStudent(student:Student){
      return this.http.put<Loginresponse>(this.baseUrl+"students",student,{headers:this.header});
    }
    //get registered events
    getRegisteredEvents(){
      return this.http.get<Event[]>(this.baseUrl+"events",{headers:this.header});
    }
  }
  