import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { ClientInterface as Client } from '../interfaces/client.interface';


@Injectable({providedIn: 'root'})
export class ClientApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getClientByUid(client: Client){
    return this.http.get<Client>('/')
  }

  public delClientByUid(client: Client){
    return this.http.delete<Client>('/')
  }

  public putClientByUid(client: Client){
    return this.http.put<Client>('/',null)
  } 

  public getClientByForeignKeyUser(client: Client){
    return this.db.collection('client', ref =>ref.where('PRIMARY_KEY', '==', client.FOREIGN_KEY_USER)).valueChanges()
  }

  public async createNewClient(client: Client){
    client.clientImageUrl = '/assets/plataform/avatar.png'
    await this.db.collection('client').add(client).then((res: any) => client = res);
    await this.update('client', client.PRIMARY_KEY, { PRIMARY_KEY: client.PRIMARY_KEY })
    //await this.clientOfQuantity()
    return client
  }

  public async clientOfQuantity() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('countOf').doc("0FPh9yLyy34ldMYC8l8t").update({ client : increment })
  }

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

}