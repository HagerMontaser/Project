import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { EditSpeakerComponent } from './edit-speaker/edit-speaker.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { adminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './login/login.component';
import { EventListComponent } from './event-list/event-list.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DetailsEventComponent } from './details-event/details-event.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { SpeakersListComponent } from './speakers-list/speakers-list.component';




@NgModule({
  declarations: [
    AddEventComponent,
    EditEventComponent,
    EditSpeakerComponent,
    EditStudentComponent,
    LoginComponent,
    EventListComponent,
    HeaderComponent,
    DetailsEventComponent,
    StudentsListComponent,
    SpeakersListComponent
  ],
  imports: [
    CommonModule,adminRoutingModule,FormsModule
  ],
  exports:[
    AddEventComponent,
    EditEventComponent,
    EditSpeakerComponent,
    EditStudentComponent
  ]
})
export class AdminModule { }
