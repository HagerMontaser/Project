import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/_models/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit,OnDestroy {

  student:Student=new Student(NaN,"","");
  sub:Subscription|null=null;

  constructor(public studentSer:StudentService,public router:Router) { }

  ngOnInit(): void {
    this.sub=this.studentSer.getStudentProfile().subscribe(
      a=>{
        this.student=a;
      }
    );
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("student/header")
  }
  editStudent(){
    this.router.navigateByUrl("student/edit");
  }
  registerdEvents(){
    this.router.navigateByUrl("student/events");
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
