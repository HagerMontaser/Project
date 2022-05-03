import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Speaker } from 'src/app/_models/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  speaker:Speaker=new Speaker(Object(),"","","","","","");
  span:string="";
  constructor(public speakerSer:SpeakerService,public router:Router) { }

  ngOnInit(): void {
  }
  add()
  {
    this.speakerSer.registerSpeaker(this.speaker).subscribe(
      a=>{
        if(a.msg==="Speaker created"){
          window.alert("Registeration done");
          this.router.navigateByUrl("speaker");
        }
      }
      ,
      error=>{
        this.span="Check inputs";
      }
    )
  }

}
