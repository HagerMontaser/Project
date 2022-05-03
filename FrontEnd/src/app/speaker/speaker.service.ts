import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Event } from '../_models/event';
import { Login } from '../_models/login';
import { Loginresponse } from '../_models/loginresponse';
import { Speaker } from '../_models/speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakerService  {
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
  //speaker register
  registerSpeaker(speaker:Speaker){
    return this.http.post<Loginresponse>(this.baseUrl+"registerspeaker",speaker);
  }
  //get speaker profile
  getSpeakerProfile(){
    return this.http.get<Speaker>(this.baseUrl+"speakers",{headers:this.header});
  }
  //edit speaker
  editSpeaker(speaker:Speaker){
    return this.http.put<Loginresponse>(this.baseUrl+"speakers",speaker,{headers:this.header});
  }
  //get registered events
  getRegisteredEvents(){
    return this.http.get<Event[]>(this.baseUrl+"events",{headers:this.header});
  }
}
