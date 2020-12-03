
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class View {

    constructor(private redirect: Router){}
    
    private readonly _loader = new BehaviorSubject<Boolean>(true);

    private readonly _user = new BehaviorSubject<String>('user');
    
    public redirectPageFor(page:string){
        this.redirect.navigate([page])
    }

    public getUser(){
        return this._user.asObservable();
    }

    public setUser(user:String){
        this._user.next(user)
    }

    public getLoader(){
        return this._loader.asObservable();
    }

    public setLoader(loader:Boolean){
        this._loader.next(loader)
    }

    public putLoader(){
        setTimeout(() => { this.setLoader(false) }, 1000)
    }

} 