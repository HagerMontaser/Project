import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';
import { Student } from 'src/app/_models/student';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  updatedEvent:Event=new Event(0,"","",Object(),[Object()],[]);
  span:string="";
  speakers:Speaker[]=[];
  students:Student[]=[];
  sub:Subscription|null=null;
  sub1:Subscription|null=null;

  constructor(public adminSer:AdminService,public router:Router,public ac:ActivatedRoute) {
    
   }


  ngOnInit(): void {
    let Mainid = (document.getElementById("mainid"))as HTMLSelectElement;
    let Otherid = (document.getElementById("otherid"))as HTMLSelectElement;
    let Studentid = (document.getElementById("studid"))as HTMLSelectElement;

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
    this.ac.params.subscribe(a=>{
      this.adminSer.getEventById(a['_id']).subscribe(
        data=>{
          this.updatedEvent=data;
          Mainid.value=this.updatedEvent.MainSpeakerId.toString();
          for (var i = 0; i < Otherid.options.length; i++) {
            for(var j=0;j<this.updatedEvent.OtherSpeakers.length;j++)
            {
              if(Otherid.options[i].value == this.updatedEvent.OtherSpeakers[j].toString()){
                Otherid.options[i].selected=true;
              }
            }
          }
          for (var i = 0; i < Studentid.options.length; i++) {
            for(var j=0;j<this.updatedEvent.Students.length;j++)
            {
              if(Studentid.options[i].value == this.updatedEvent.Students[j].toString()){
                Studentid.options[i].selected=true;
              }
            }
          }
        }
      )
    })
  }
  //back to list
  back(){
    this.router.navigateByUrl("admin/eventlist");
  }
  edit(){

    var Mainid = (document.getElementById("mainid"))as HTMLSelectElement;
    //main speaker
    Mainid.value=this.updatedEvent.MainSpeakerId.toString();
    let selectedMainSpeaker:any;
    selectedMainSpeaker= Mainid.selectedOptions[0].value;

    //other speakers
    var Otherid = (document.getElementById("otherid"))as HTMLSelectElement;
    var selectedOtherSpeakers:any[] = [];
    for (let i=0; i< Otherid.selectedOptions.length;i++) {
      selectedOtherSpeakers.push(Otherid.selectedOptions[i].value);
    }
    this.updatedEvent.OtherSpeakers=selectedOtherSpeakers;

    //students
    var Studentid = (document.getElementById("studid"))as HTMLSelectElement;
    var selectedStudents:any[] = [];
    for (let i=0; i< Studentid.selectedOptions.length;i++) {
      selectedStudents.push(Studentid.selectedOptions[i].value);
    }
    this.updatedEvent.Students=selectedStudents;
    
    this.adminSer.editEvent(this.updatedEvent).subscribe(
      a=>{
        if(a.msg="Event updated")
        {
          this.router.navigateByUrl("admin/eventlist");
        }
        else
        {
          this.span="check inputs";
        }
      }
    )
  }
}
