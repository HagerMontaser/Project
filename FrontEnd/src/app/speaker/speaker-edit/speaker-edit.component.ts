import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speaker } from 'src/app/_models/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})
export class SpeakerEditComponent implements OnInit {

  speaker:Speaker=new Speaker(Object(),"","","","","","");
  span:string="";
  constructor(public speakerSer:SpeakerService,public router:Router) { }

  ngOnInit(): void {
    this.speakerSer.getSpeakerProfile().subscribe(
      data=>{
        this.speaker=data;
      },
      error=>{
        console.log(error);
      }
    )
  }

  //back to list
  back(){
    this.router.navigateByUrl("speaker");
  }
  //edit student
  edit(){
    this.speakerSer.editSpeaker(this.speaker).subscribe(
      a=>{
        if(a.msg="Speaker updated")
        {
          this.router.navigateByUrl("speaker");
        }
      },
      error=>{
        this.span="Check inputs";
      }
    )
  }

}
