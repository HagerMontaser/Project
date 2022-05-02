import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/_models/event';
import { Speaker } from 'src/app/_models/speaker';
import { Student } from 'src/app/_models/student';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
  event:Event=new Event(0,"","",Object(),[Object()],[]);
  mainspeaker:Speaker=new Speaker(Object(),"","","","","","");
  otherspeakers:Speaker[]=[];
  students:Student[]=[];

  constructor(public adminSer:AdminService,public router:Router,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.ac.params.subscribe(a=>{
      this.adminSer.getEventById(a['_id']).subscribe(
        data=>{
          this.event=data;
        this.adminSer.getSpeakerById(this.event.MainSpeakerId).subscribe(
          ms=>{
            this.mainspeaker=ms;
        })
        for(var i=0;i<this.event.OtherSpeakers.length;i++)
        {
          this.adminSer.getSpeakerById(this.event.OtherSpeakers[i]).subscribe(
            os=>{
              this.otherspeakers.push(os);
          })
        }
        for(var i=0;i<this.event.Students.length;i++)
        {
          this.adminSer.getStudentById(this.event.Students[i]).subscribe(
            os=>{
              this.students.push(os);
          })
        }
      })
    })

      
  }

  //back to list
  back(){
    this.router.navigateByUrl("admin/eventlist");
  }
}

  


