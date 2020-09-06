
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class View {

    constructor(private redirect: Router){}

    private user:String = "user";

    private loader:Boolean =  true;
    
    public redirectPageFor(page:string){
        this.redirect.navigate([page])
    }

    public getUser(){
        return this.user
    }

    public setUser(user:String){
        this.user = user
    }

    public getLoader(){
        return this.loader
    }

    public setLoader(loader:Boolean){
        this.loader = loader
    }

    public putLoader(){
        setTimeout(() => { this.setLoader(false) }, 3000)
    }
} 