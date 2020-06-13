import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class StorePanelService {

  constructor(private db: AngularFirestore, private http:HttpClient){}

  public getcategory(){
    return  this.db.collection('category').valueChanges()
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

  public async alterarCadastroLoja(data) {
    delete data.imageNew
    delete data.imageDisplay
    var res:any = false
    await  this.db.collection('store').doc(data.PRIMARY_KEY).update(data).then( r =>{
      res = r
    })
    return res
  }

  public async update(collection:string, pk:string, data:any) {
    console.log(collection, pk, data)
    var res:any = false
    await this.db.collection(collection).doc(pk).update(data).then( r =>{
      res = r
    })
    return res
  }

  public getIdDocByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY))
  }

  public getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }


  public getCEP(cep) {
    return this.http.get<any[]>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}




