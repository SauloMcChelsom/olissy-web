import { Injectable } from '@angular/core';
import { UserApi as api } from '../api/user.api';
import { UserState as state } from '../state/user.state';
import { UserInterface as User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private api: api, private state: state) {}

  public getUserByEmailInApi(user: User){
    return this.api.getUserByEmail(user)
  }

  public signInWithEmailAndPasswordInApi(user: User){
    return this.api.signInWithEmailAndPassword(user)
  }

  public getUserByUidInApi(user: User){
    return this.api.getUserByUid(user)
  }

  public createNewUserInApi(user: User){
    return this.api.createNewUser(user)
  }

  public putUserByUidInApi(user: User){
    return this.api.putUserByUid(user)
  }

  public delUserByUidInApi(user: User){
    return this.api.delUserByUid(user)
  }

  public  pullUserInState(){
    return this.state.pullUser()
  }

  public getUserInState(){
    return this.state.getUser()
  }

  public setUserInState(user: User[]){
    this.state.setUser(user)
  }

  public addUserInState(){
    this.state.addUser()
  }

  public PutUserInState(){
    return this.state.PutUser()
  }

  public delUserInState(){
    return this.state.delUser()
  }

}