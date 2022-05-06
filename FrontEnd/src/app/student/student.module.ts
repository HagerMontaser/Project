import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterdEventsComponent } from './registerd-events/registerd-events.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentInfoComponent } from './student-info/student-info.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { studentRoutingModule } from './student-routing.module';



@NgModule({
  declarations: [
    RegisterdEventsComponent,
    StudentEditComponent,
    StudentInfoComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,FormsModule,studentRoutingModule
  ]
})
export class StudentModule { }
