import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { speakerRoutingModule } from './speaker-routing.module';
import { FormsModule } from '@angular/forms';
import { SpeakerInfoComponent } from './speaker-info/speaker-info.component';
import { SpeakerEditComponent } from './speaker-edit/speaker-edit.component';
import { RegisterdEventsComponent } from './registerd-events/registerd-events.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SpeakerInfoComponent,
    SpeakerEditComponent,
    RegisterdEventsComponent
  ],
  imports: [
    CommonModule,speakerRoutingModule,FormsModule
  ],
  providers:[
   
  ]
})
export class SpeakerModule { }
