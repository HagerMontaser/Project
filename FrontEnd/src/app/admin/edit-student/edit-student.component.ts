import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/_models/student';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  student:Student=new Student(0,"","");
  span:string="";
  constructor(public adminSer:AdminService,public router:Router,public ac:ActivatedRoute) { }

  ngOnInit(): void {
    this.ac.params.subscribe(a=>{
      this.adminSer.getStudentById(a['_id']).subscribe(
        data=>{
          this.student=data;
        }
      )
    })
  }

  //back to list
  back(){
    this.router.navigateByUrl("admin/studentlist");
  }
  //edit student
  edit(){
    this.adminSer.editStudent(this.student).subscribe(
      a=>{
        if(a.msg="Student updated")
        {
          this.router.navigateByUrl("admin/studentlist");
        }
      },
      error=>{
        this.span="Check inputs";
      }
    )
  }

}
