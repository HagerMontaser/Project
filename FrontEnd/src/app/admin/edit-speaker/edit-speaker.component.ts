import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Speaker } from 'src/app/_models/speaker';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-speaker',
  templateUrl: './edit-speaker.component.html',
  styleUrls: ['./edit-speaker.component.css']
})
export class EditSpeakerComponent implements OnInit {

  speaker:Speaker=new Speaker(Object(),"","","","","","");
  span:string="";
  constructor(public adminSer:AdminService,public router:Router,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.ac.params.subscribe(a=>{
      this.adminSer.getSpeakerById(a['_id']).subscribe(
        data=>{
          this.speaker=data;
        }
      )
    })
  }

  //back to list
  back(){
    this.router.navigateByUrl("admin/speakerlist");
  }
  //edit student
  edit(){
    this.adminSer.editSpeaker(this.speaker).subscribe(
      a=>{
        if(a.msg="Speaker updated")
        {
          this.router.navigateByUrl("admin/speakerlist");
        }
      },
      error=>{
        this.span="Check inputs";
      }
    )
  }

}
