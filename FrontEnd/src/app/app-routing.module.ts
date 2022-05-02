import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './core/content/content.component';

const routes:Routes =[
  {path:"home",component:ContentComponent},
  {path:"",component:ContentComponent},
  {path:"admin",loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  {path:"student",loadChildren:()=>import('./student/student.module').then(m=>m.StudentModule)},
  {path:"speaker",loadChildren:()=>import('./speaker/speaker.module').then(m=>m.SpeakerModule)},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
