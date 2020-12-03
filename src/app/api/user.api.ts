import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { UserInterface as User } from '../interfaces/user.interface';

 
@Injectable({providedIn: 'root'})
export class UserApi {
 

  readonly url = `${environment.node.host}${'users/'}` ;

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private db: AngularFirestore){}

  public async createNewOrSignInUserWithPopupInFirebase() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }

  public async createNewUserWithEmailAndPasswordInFirebase(user: User){
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(res => user.FOREIGN_KEY_UID = res.user.uid)
    return user
  }

  public async signInWithEmailAndPasswordInFirebase(user: User) {
    return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  }

  public async deleteUserInFirebase(){
    return firebase.auth().currentUser.delete();
  }

  public  isLoggedInFirebase() {
    return new Observable((observer: Observer<any>) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        observer.next(user);
      });
    });
  }

  public async logoutInFirebase() {
    return await this.afAuth.auth.signOut();
  }

  public async createNewAccountInOlisy(user: User){
    delete user.FOREIGN_KEY_UID
    delete user.PRIMARY_KEY
    delete user.retypePassword
    delete user.retypePassword

    console.log(user)
    return this.http.post<User>(this.url, JSON.stringify(user), this.httpOptions)
    .pipe( 
      retry(10),
      catchError(this.handleError)
    ).toPromise()
  }

  public getUserByUid(user: User){
    return this.db.collection('user', ref =>ref.where('FOREIGN_KEY_UID', '==', user.FOREIGN_KEY_UID)).valueChanges()
  }

  public async emailInformedExists(user: User){
    return this.http.get<Boolean>(`${this.url}email-existed/${user.email}`, this.httpOptions)
    .pipe( 
      retry(10), 
      catchError(this.handleError)
    ).toPromise()
  }

  public async informationOfUser(user: User){
    return this.http.get<any>(`${this.url}info/${user.foreign_key_uid}`, this.httpOptions)
    .pipe( 
      retry(10), 
      catchError(this.handleError)
    ).toPromise()
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}
