import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Speaker } from 'src/app/_models/speaker';
import { AdminService } from '../admin.service';
import * as mongoose from "mongoose";

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.css']
})
export class SpeakersListComponent implements OnInit,OnDestroy {
  speakers:Speaker[]=[];
  sub:Subscription|null=null;
  constructor(public adminSer:AdminService,public router:Router) { }
  

  ngOnInit(): void {
    this.sub=this.adminSer.getSpeakersList().subscribe(
      a=>{
        this.speakers=a;
      }
    )
  }
  editSpeaker(id:mongoose.Types.ObjectId){
    this.router.navigateByUrl("admin/editspeaker/"+id);
  }
  deleteSpeaker(id:mongoose.Types.ObjectId){
    if(window.confirm("Are you sure ?")){
      this.adminSer.deleteSpeaker(id).subscribe(
        a=>{
          if(a.msg="Event deleted")
          {
            this.ngOnInit();
          }
        }
      )
    }
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
