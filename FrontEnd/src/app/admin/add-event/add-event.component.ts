import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';
import { Student } from 'src/app/_models/student';
import { AdminService } from '../admin.service';
import * as mongoose from "mongoose";



@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit ,OnDestroy{
  
  event:Event=new Event(0,"","",[Object()],[Object()],[]);
  span:string="";
  speakers:Speaker[]=[];
  students:Student[]=[];
  sub:Subscription|null=null;
  sub1:Subscription|null=null;


  constructor(public adminSer:AdminService,public router:Router) { }
  

  ngOnInit(): void {
    this.sub = this.adminSer.getSpeakersList().subscribe(
      a=>{
        this.speakers=a;
      }
    )
    this.sub1 = this.adminSer.getStudentsList().subscribe(
      a=>{
        this.students=a;
      }
    )
  }

  add(){
    //main speaker
    var Mainid = (document.getElementById("mainid"))as HTMLSelectElement;
    let selectedMainSpeaker:any[]=[];
    if(Mainid.selectedOptions[0].value!='')
    {
      selectedMainSpeaker[0]= Mainid.selectedOptions[0].value;
    }
    this.event.MainSpeakerId=selectedMainSpeaker;

    //other speakers
    var Otherid = (document.getElementById("otherid"))as HTMLSelectElement;
    var selectedOtherSpeakers:any[] = [];
    for (let i=0; i< Otherid.selectedOptions.length;i++) {
      selectedOtherSpeakers.push(Otherid.selectedOptions[i].value);
    }
    this.event.OtherSpeakers=selectedOtherSpeakers;

    //students
    var Studentid = (document.getElementById("studid"))as HTMLSelectElement;
    var selectedStudents:any[] = [];
    for (let i=0; i< Studentid.selectedOptions.length;i++) {
      selectedStudents.push(Studentid.selectedOptions[i].value);
    }
    this.event.Students=selectedStudents;

    //add event
    this.adminSer.addNewEvent(this.event).subscribe(
      a=>{
        this.router.navigateByUrl("admin/eventlist")
      }
      ,
      error=>{
        this.span="check your inputs";
        console.log(error);
      }
    )
  }
  //back to list
  back(){
    this.router.navigateByUrl("admin/eventlist");
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.sub1?.unsubscribe();
  }


}
