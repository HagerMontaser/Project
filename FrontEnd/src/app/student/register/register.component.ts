import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/_models/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  student:Student=new Student(NaN,"","");
  span:string="";
  constructor(public studentSer:StudentService,public router:Router) { }

  ngOnInit(): void {
  }
  add()
  {
    this.studentSer.registerStudents(this.student).subscribe(
      a=>{
        if(a.msg==="Student created"){
          window.alert("Registeration done");
          this.router.navigateByUrl("student");
        }
      }
      ,
      error=>{
        this.span="Check inputs";
      }
    )
  }

}
