import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReactInterface as React } from '../interfaces/react.interface';


@Injectable({providedIn: 'root'})
export class ReactState {

  private readonly _react = new BehaviorSubject<any[]>([]);

  public pullReact(){
    return this._react.value[0]
  } 

  public getReact(){
    return this._react.asObservable();
  }

  public setReact(react: React){
    this._react.next([react])
  }

  public addReact(){

  } 

  public PutReact(){
    this._react.next([]);
  } 

  public delReact(){
    this._react.next([]);
  } 

}