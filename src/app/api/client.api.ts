import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import 'firebase/storage'; 

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

  public async putClientByUid(client: Client){
    await this.update('client', client.PRIMARY_KEY, client)
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
    client.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    client.DATE = new Date().toString()

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

}