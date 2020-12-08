import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 

import { ClientInterface as Client } from '../interfaces/client.interface';


@Injectable({providedIn: 'root'})
export class ClientApi {


  readonly url = `${environment.node.host}${'clients/'}` ;

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getClientByUid(client: Client){
    return this.http.get<Client>('/')
  }

  public delClientByUid(client: Client){
    return this.http.delete<Client>('/')
  }

  public async putClientByUid(client: Client){


    delete client.email;
    delete client.FOREIGN_KEY_USER;
    delete client.PRIMARY_KEY;
    delete client.cellPhone;
    delete client.imageIconPath;
    delete client.imageIconUrl;
    delete client.lastName;
    delete client.stateFederal;
 

    console.log(client.birth)
    

      client =  [client].find((element, index, array) =>{
        for (const key in element) {
          if(element[key] == null){
            element[key] = ""
          }
        }
        return element
      })

      console.log(client)

    return this.http.put<Client>(this.url+client.primary_key, JSON.stringify(client), this.httpOptions)
    .pipe( 
      retry(0),
      catchError(this.handleError)
    ).toPromise()
  } 

  public async sendImagemStorage(name, image){
    await firebase.storage().ref().child(name).put(image)
    return await firebase.storage().ref().child(name).getDownloadURL()
  }

  public async putImagemStorage(name, imagem){
    return await firebase.storage().ref().child(name).put(imagem).then(async (r:any) =>{
      return await this.getUrlImagemStorage(r.metadata.fullPath)
    })
  }

  public async getUrlImagemStorage(path){
    return await firebase.storage().ref().child(path).getDownloadURL()
  }

  public getClientByForeignKeyUser(client: Client){
    return this.db.collection<Client>('client', ref =>ref.where('FOREIGN_KEY_USER', '==', client.FOREIGN_KEY_USER)).valueChanges()
  }

  public async createNewClient(client: Client){
    await this.db.collection('client').add(client).then((res: any) => client.PRIMARY_KEY = res.id);
    await this.update('client', client.PRIMARY_KEY, { PRIMARY_KEY: client.PRIMARY_KEY })
    await this.increment()
    return client
  }

  public async increment() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('increment').doc("00").update({ client : increment })
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  // Manipulação de erros
  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}