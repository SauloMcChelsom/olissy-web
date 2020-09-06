import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

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
    return this.db.collection('user', ref =>ref.where('FOREIGN_KEY_UID', '==', user.FOREIGN_KEY_UID)).valueChanges()
  }

  public delUserByUid(user: User){
    return this.http.delete<User>('/')
  }

  public async putUserByUid(user: User){
    return await this.db.collection('user').doc(user.PRIMARY_KEY).update(user)
  } 

  public getUserByEmail(user: User){
    return this.db.collection('user', ref =>ref.where('email', '==', user.email)).valueChanges()
  }

  public async createNewUserWithPopup(user: User){
    user.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    user.DATE = new Date().toString()
    
    await this.firebase(user).then(user => user)
    await this.update('user', user.PRIMARY_KEY, { PRIMARY_KEY: user.PRIMARY_KEY })
    return user
  }

  public async signInWithPopup() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  public async createNewUserWithEmailAndPassword(user: User){
    user.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    user.DATE = new Date().toString()

    await this.createUserWithEmailAndPassword(user)
    await this.firebase(user).then(user => user)
    await this.update('user', user.PRIMARY_KEY, { PRIMARY_KEY: user.PRIMARY_KEY })
    return user
  }

  public async signInWithEmailAndPassword(user: User) {
    return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  public async createUserWithEmailAndPassword(user: User){
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => {
      user.password = null
      user.retypePassword = null
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

  public  isLogged() {
    return new Observable((observer: Observer<any>) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        observer.next(user);
      });
    });
  }

  public async logout() {
    return await this.afAuth.auth.signOut();
  }
}
