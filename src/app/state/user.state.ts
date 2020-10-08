import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface as User } from '../interfaces/user.interface';


@Injectable({providedIn: 'root'})
export class UserState {

  private readonly _user = new BehaviorSubject<User[]>([]);

  public pullUser(){
    return this._user.value[0]
  } 

  public getUser(){
    return this._user.asObservable();
  }

  public setUser(user: User[]){
    this._user.next(user)
  }

  public addUser(){
  } 

  public PutUser(){
    this._user.next([]);
  } 

  public delUser(){
    this._user.next([]);
  } 

}