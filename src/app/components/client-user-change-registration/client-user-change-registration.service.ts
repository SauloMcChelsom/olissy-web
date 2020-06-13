import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';
import { HttpClient } from '@angular/common/http';
import '@firebase/storage';
import '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})

export class ClientUserChangeRegistrationService {

  constructor(private db: AngularFirestore, private http: HttpClient){}

  public async alterarDadosCliente( pk:string, data:any) {
    delete data.imageDisplay
    delete data.imageNew

    var res:any = false
    await this.db.collection('client').doc(pk).update(data).then( r =>{
      res = r
    })
    return res
  }

  public getIdDocByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY))
  }

  public async deletarImagemStorage(path){
    let url = false
    await firebase.storage().ref().child(path).delete().then( function(r){
      url = true
    })
    return url
  }

  public async setImagemStorage(imageName, imagem){
    var res:any = false
    await firebase.storage().ref().child(imageName).put(imagem).then(async (r:any) =>{
      res = await this.obterImagemStorage(r.metadata.fullPath)
    })
    return res
  }

  public async obterImagemStorage(path){
    var res:any = false
    await firebase.storage().ref().child(path).getDownloadURL().then( r =>{
      res = r
    })
    return res
  }

  public getCEP(cep) {
    return this.http.get<any[]>(`https://viacep.com.br/ws/${cep}/json/`);
  }

}
