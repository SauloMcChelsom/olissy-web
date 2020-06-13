import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { auth } from 'firebase/app';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import { AppService } from './app.service';
import { client, store } from './interfaces';

/*
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';
import { firebase } from '@firebase/app';
*/

@Injectable()
export class AuthService {
  constructor(
    private appService: AppService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router_navigator: Router
  ) {}

  public isLogged() {
    return new Observable((observer: Observer<any>) => {
      firebase.auth().onAuthStateChanged((user: any) => {
        observer.next(user);
      });
    });
  }

  public registration(usuario: any): any {
    return firebase.auth().createUserWithEmailAndPassword(usuario.userEmail, usuario.password).then(resposta => {
        delete usuario.password;
        delete usuario.retypePassword;
        usuario.FOREIGN_KEY = resposta.user.uid;
        this.create_usuario('user', usuario);
        this.create_cliente('client', usuario);
        this.create_store('store', usuario);
      });
  }

  public create_store(collection, data) {
    const store: store = {
      FOREIGN_KEY: data.FOREIGN_KEY,
      productQuantity:0,
      PRIMARY_KEY: '',
      storeAbout: '',
      storeCategory: '',
      storeDeliveryEstimate: '',
      storeHours: '',
      storeImagePath: '',
      storeImageUrl:'/assets/plataform/avatar.png',
      storeName: '',
      storeRating: 0,
      follow: 0,
      storeCity: '',
      storeNeighborhood: '',
      storeStreet: '',
      storeCellPhone: '',
      storeEmail: data.userEmail,
      storeTelephone: ''
    };
    return new Promise<any>((resolve, reject) => {
      this.db.collection(collection).add(store).then(res => {
        this.update(collection, res.id, { PRIMARY_KEY: res.id });
      });
    });
  }

  public create_usuario(collection, data) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection(collection).add(data).then(res => {
        this.update(collection, res.id, { PRIMARY_KEY: res.id });
      },err => reject(err));
    });
  }

  public create_cliente(collection, data) {
    const cliente: client = {
      FOREIGN_KEY: data.FOREIGN_KEY,
      PRIMARY_KEY: '',
      clientNeighborhood: '',
      clientCellPhone: '',
      clientCity: '',
      clientEmail: data.userEmail,
      clientImagePath: '',
      clientImageUrl:'/assets/plataform/avatar.png',
      clientBirth: '',
      clientName: data.userName,
      clientStreet: '',
      clientSex: '',
      clientLastName: '',
      clientTelephone: ''
    };
    return new Promise<any>((resolve, reject) => {
      this.db.collection(collection).add(cliente).then(res => {
        this.update(collection, res.id, { PRIMARY_KEY: res.id }).then(()=>{
          this.clientOfQuantity()
        })
      });
    });
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public async authenticationByGoogle() {
    return await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((res: any) => {
      const usuario = {
        PRIMARY_KEY: '',
        FOREIGN_KEY: res.user.uid,
        userEmail: res.user.email,
        userName: res.user.displayName,
        userTerms: true,
        userType: 1
      };
      this.getByFOREIGN_KEY('user', res.user.uid).subscribe((resposta: any) => {
        if (Object.keys(resposta).length == 0) {
          // se nao exirtir usuario, cadastre!
          this.create_usuario('user', usuario);
          this.create_cliente('client', usuario);
          this.create_store('store', usuario);
        } else {
          if (resposta[0].userType == 2) {
            this.appService.router_app_componet = 'comercio';
            this.router_navigator.navigate(['/product']);
          }
          if (resposta[0].userType == 1) {
            this.appService.router_app_componet = 'cliente';
            this.router_navigator.navigate(['/product']);
          }
        }
      });
    });
  }

  public getByFOREIGN_KEY(collection, FOREIGN_KEY) {
    return this.db.collection(collection, ref =>ref.where('FOREIGN_KEY', '==', FOREIGN_KEY)).valueChanges();
  }

  public async login(Remember_me: boolean = false, email: string, password: string) {
    if(Remember_me){
      return await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    }else{
      return await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async () => {
        return await firebase.auth().signInWithEmailAndPassword(email, password);
      });
    }
  }

  public async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
  }

  public async enviarEmailRedefinirSenha(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  public async logout() {
    await localStorage.removeItem('user');
    return await this.afAuth.auth.signOut();
  }

  public async clientOfQuantity() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('countOf').doc("0FPh9yLyy34ldMYC8l8t").update({ client : increment })
  }

}

