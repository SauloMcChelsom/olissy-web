
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class View {

    constructor(private redirect: Router){}

    public loader:Boolean =  true;

    private readonly _user = new BehaviorSubject<any[]>(['user']);
    
    public redirectPageFor(page:string){
        this.redirect.navigate([page])
    }

    public getUser(){
        return this._user.asObservable();
    }

    public setUser(user:String){
        this._user.next([user])
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