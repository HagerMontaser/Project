import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Event } from 'src/app/_models/event';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-registerd-events',
  templateUrl: './registerd-events.component.html',
  styleUrls: ['./registerd-events.component.css']
})
export class RegisterdEventsComponent implements OnInit,OnDestroy {

  events:Event[]=[];
  sub:Subscription|null=null;

  constructor(public speakerSer:SpeakerService,public router:Router) { }

  ngOnInit(): void {
    this.sub=this.speakerSer.getRegisteredEvents().subscribe(
      a=>{
        this.events=a;
      }
    )
  }
   //back to list
   back(){
    this.router.navigateByUrl("speaker");
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    
  }

}
