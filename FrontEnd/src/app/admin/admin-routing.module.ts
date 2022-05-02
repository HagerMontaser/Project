import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLoginGuard } from "../_guards/adminlogin-guard";
import { AddEventComponent } from "./add-event/add-event.component";
import { DetailsEventComponent } from "./details-event/details-event.component";
import { EditEventComponent } from "./edit-event/edit-event.component";
import { EditSpeakerComponent } from "./edit-speaker/edit-speaker.component";
import { EditStudentComponent } from "./edit-student/edit-student.component";
import { EventListComponent } from "./event-list/event-list.component";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { SpeakersListComponent } from "./speakers-list/speakers-list.component";
import { StudentsListComponent } from "./students-list/students-list.component";

const routes:Routes =[
    {path:"login",component:LoginComponent},
    {path:"",component:HeaderComponent,canActivate:[AdminLoginGuard],
    children:[
        {path:"eventlist",component:EventListComponent},
        {path:"addevent",component:AddEventComponent},
        {path:"editevent/:_id",component:EditEventComponent},
        {path:"detailsevent/:_id",component:DetailsEventComponent},
        {path:"studentlist",component:StudentsListComponent},
        {path:"speakerlist",component:SpeakersListComponent},
        {path:"editstudent/:_id",component:EditStudentComponent},
        {path:"editspeaker/:_id",component:EditSpeakerComponent},
    ]}

];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class adminRoutingModule{

}