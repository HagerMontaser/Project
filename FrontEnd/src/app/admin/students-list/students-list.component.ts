import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Student } from 'src/app/_models/student';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit,OnDestroy {
  students:Student[]=[];
  sub:Subscription|null=null;


  constructor(public adminSer:AdminService,public router:Router) { }
  

  ngOnInit(): void {
    this.sub=this.adminSer.getStudentsList().subscribe(
      a=>{
        this.students=a;
      }
    )
  }
  editStudent(id:number){
    this.router.navigateByUrl("admin/editstudent/"+id);
  }
  deleteStudent(id:number){
    if(window.confirm("Are you sure ?")){
      this.adminSer.deleteStudent(id).subscribe(
        a=>{
          if(a.msg="Event deleted")
          {
            this.ngOnInit();
          }
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
