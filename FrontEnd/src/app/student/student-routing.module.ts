import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpeakerLoginGuard } from "../_guards/speakerlogin.guard";
import { StudentLoginGuard } from "../_guards/studentlogin.guard";
import { HeaderComponent } from "./header/header.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RegisterdEventsComponent } from "./registerd-events/registerd-events.component";
import { StudentEditComponent } from "./student-edit/student-edit.component";
import { StudentInfoComponent } from "./student-info/student-info.component";

const routes:Routes =[
    {path:"",component:StudentInfoComponent,canActivate:[StudentLoginGuard]},
    {path:"edit",component:StudentEditComponent},
    {path:"events",component:RegisterdEventsComponent},
    {path:"header",component:HeaderComponent,
    children:[
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent},
    ]},
];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class studentRoutingModule{

}