import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from 'src/app/_models/login';
import { Loginresponse } from 'src/app/_models/loginresponse';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  span:string="";
  log:Login=new Login("","");
  res:Loginresponse=new Loginresponse("","");
  sub:Subscription|null=null;

  constructor(public speakerSer:SpeakerService,public router:Router) { }

  ngOnInit(): void {
  }
  login(){

    this.sub=this.speakerSer.getLoginResponse(this.log).subscribe(
      a=>{
        if(a.token!=undefined && a.token!=null && a.msg=="speaker")
        {
          this.res=a;
          localStorage.setItem("token",this.res.token);
          this.speakerSer.header=new HttpHeaders().set("Authorization",localStorage.getItem("token")??"undefined");
          this.router.navigateByUrl("speaker");
        }
        else
        {
          this.span="Login not successful";
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
