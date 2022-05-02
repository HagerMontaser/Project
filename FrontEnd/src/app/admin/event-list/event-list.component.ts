import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/_models/event';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit,OnDestroy {
  events:Event[]=[];
  sub:Subscription|null=null;

  constructor(public adminSer:AdminService,public router:Router) { }

  ngOnInit(): void {
    this.sub=this.adminSer.getEventsList().subscribe(
      a=>{
        this.events=a;
      }
    )
  }
  //add event ->navigate to add component
  addEvent(){
    this.router.navigateByUrl("admin/addevent");
  }
  //edit event 
  editEvent(id:number){
    this.router.navigateByUrl("admin/editevent/"+id);
  }
  //details event
  detailsEvent(id:number){
    this.router.navigateByUrl("admin/detailsevent/"+id);
  }
  //delete event
  deleteEvent(id:number){
    if(window.confirm("Are you sure ?")){
      this.adminSer.deleteEvent(id).subscribe(
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
