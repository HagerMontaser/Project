import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/_models/event';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-registerd-events',
  templateUrl: './registerd-events.component.html',
  styleUrls: ['./registerd-events.component.css']
})
export class RegisterdEventsComponent implements OnInit , OnDestroy {
  events:Event[]=[];
  sub:Subscription|null=null;

  constructor(public studentSer:StudentService,public router:Router) { }

  ngOnInit(): void {
    this.sub=this.studentSer.getRegisteredEvents().subscribe(
      a=>{
        this.events=a;
      }
    )
  }

  //back to list
  back(){
    this.router.navigateByUrl("student");
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    
  }

}
