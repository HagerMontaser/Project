import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Speaker } from 'src/app/_models/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-speaker-info',
  templateUrl: './speaker-info.component.html',
  styleUrls: ['./speaker-info.component.css']
})
export class SpeakerInfoComponent implements OnInit,OnDestroy {
  
  constructor(public speakerSer:SpeakerService,public router:Router) { }
  speaker:Speaker=new Speaker(Object(),"","","","","","");
  sub:Subscription|null=null;

  ngOnInit(): void {
    this.sub=this.speakerSer.getSpeakerProfile().subscribe(
      a=>{
        this.speaker=a;
      }
    );
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("speaker/header")
  }
  editSpeaker(){
    this.router.navigateByUrl("speaker/edit");
  }
  registerdEvents(){
    this.router.navigateByUrl("speaker/events");
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
