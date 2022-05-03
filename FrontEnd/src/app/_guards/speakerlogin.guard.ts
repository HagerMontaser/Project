import { Injectable } from "@angular/core";

import { CanActivate, Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
  })
export class SpeakerLoginGuard implements CanActivate{
    constructor(public router:Router)
    {

    }
   
    canActivate() {
        if(localStorage.getItem("token")!="undefined" && localStorage.getItem("token")!=null)
        {
            return true;
        }
        this.router.navigateByUrl("speaker/header/login");
        return false;
    }
    
}

