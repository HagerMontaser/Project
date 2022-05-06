import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/_models/student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student:Student=new Student(NaN,"","");
  span:string="";
  constructor(public studentSer:StudentService,public router:Router) { }

  ngOnInit(): void {
    this.studentSer.getStudentProfile().subscribe(
      data=>{
        this.student=data;
      },
      error=>{
        console.log(error);
      }
    )
  }
  //back to list
  back(){
    this.router.navigateByUrl("student");
  }
  //edit student
  edit(){
    this.studentSer.editStudent(this.student).subscribe(
      a=>{
        if(a.msg="Student updated")
        {
          this.router.navigateByUrl("student");
        }
      },
      error=>{
        this.span="Check inputs";
      }
    )
  }
}
