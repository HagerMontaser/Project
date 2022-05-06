import { Injectable } from "@angular/core";

import { CanActivate, Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
  })
export class StudentLoginGuard implements CanActivate{
    constructor(public router:Router)
    {

    }
   
    canActivate() {
        if(localStorage.getItem("token")!="undefined" && localStorage.getItem("token")!=null)
        {
            return true;
        }
        this.router.navigateByUrl("student/header/login");
        return false;
    }
    
}

