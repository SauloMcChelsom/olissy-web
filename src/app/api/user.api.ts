import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import { auth } from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { UserInterface as User } from '../interfaces/user.interface';

 
@Injectable({providedIn: 'root'})
export class UserApi {

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private db: AngularFirestore){}

  public getUserByUid(user: User){
    return this.http.get<User>('/')
  }

  public delUserByUid(user: User){
    return this.http.delete<User>('/')
  }

  public putUserByUid(user: User){
    return this.http.put<User>('/',null)
  } 

  public getUserByEmail(user: User){
    return this.db.collection('user', ref =>ref.where('userEmail', '==', user.userEmail)).valueChanges()
  }

  public async signInWithEmailAndPassword(user: User) {
    if(true){
      return await this.afAuth.auth.signInWithEmailAndPassword(user.userEmail, user.password);
    }else{
      return await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async () => {
        return await firebase.auth().signInWithEmailAndPassword(user.userEmail, user.password);
      });
    }
  }

  public async authenticationByGoogle() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res: any) => {
      console.log(res)
    });
  }

  public async createNewUser(user: User){
    await this.google(user).then(user => user)
    await this.firebase(user).then(user => user)
    await this.update('user', user.PRIMARY_KEY, { PRIMARY_KEY: user.PRIMARY_KEY })
    return user
  }

  public async google(user: User){
    await firebase.auth().createUserWithEmailAndPassword(user.userEmail, user.password).then(res => {
      delete user.password;
      delete user.retypePassword;
      user.FOREIGN_KEY_UID = res.user.uid
    })
    return user
  }

  public async firebase(user: User){
    await this.db.collection('user').add(user).then(async res => {
      user.PRIMARY_KEY = res.id
    });
    return user
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public async isLogged() {
    await firebase.auth().onAuthStateChanged((auth) => {console.log(auth)});
  }

  public async logout() {
    await localStorage.removeItem('user');
    return await this.afAuth.auth.signOut();
  }
}
