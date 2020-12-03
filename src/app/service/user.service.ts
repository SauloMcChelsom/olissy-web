import { Injectable } from '@angular/core';
import { UserApi as api } from '../api/user.api';
import { UserState as state } from '../state/user.state';
import { UserInterface as User } from '../interfaces/user.interface';
export { User }

@Injectable({providedIn: 'root'})
export class UserService {


  constructor(private api: api, private state: state) {}

  public emailInformedExistsInApi(user: User){
    return this.api.emailInformedExists(user)
  }

  public signInWithEmailAndPasswordInFirebaseInApi(user: User){
    return this.api.signInWithEmailAndPasswordInFirebase(user)
  }

  public getUserByUidInApi(user: User){
    return this.api.getUserByUid(user)
  }

  public informationOfUserInApi(user: User){
    return this.api.informationOfUser(user)
  }

  public createNewAccountInOlisyInApi(user: User){
    return this.api.createNewAccountInOlisy(user)
  }

  public createNewUserWithEmailAndPasswordInFirebaseInApi(user: User){
    return this.api.createNewUserWithEmailAndPasswordInFirebase(user)
  }

  public deleteUserInFirebaseInApi(){
    return this.api.deleteUserInFirebase()
  }

  public isLoggedInFirebaseInApi(){
    return this.api.isLoggedInFirebase()
  }

  public logoutInFirebaseInApi() {
    return this.api.logoutInFirebase()
  }

  public createNewOrSignInUserWithPopupInFirebaseInApi(){
    return this.api.createNewOrSignInUserWithPopupInFirebase()
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

  public putUserInState(){
    return this.state.PutUser()
  }

  public delUserInState(){
    return this.state.delUser()
  }

  public get user():User{
    return {
      timestamp: '',
      foreign_key_uid : '',
      primary_key: 0,
      password: '203327.Ss',
      retype_password: '203327.Ss',
      email: 'karla@gmail.com',
      name: 'karla',
      terms: true,
      type: 1,
      FOREIGN_KEY_UID : '',
      PRIMARY_KEY: 0,
      retypePassword: '203327.Ss',
      provide:'olissy'
    }
  }
}