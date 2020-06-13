import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';
import '@firebase/storage';


@Injectable({
  providedIn: 'root',
})

export class ClientOpenYourStoreService {

  constructor(private db: AngularFirestore, private http:HttpClient){}

  async setImagemStorage(imageName, imagem){
    var res:any = false
    await firebase.storage()
                  .ref()
                  .child(imageName)
                  .put(imagem)
                  .then(async (r:any) =>{
                    res = await this.obterImagemStorage(r.metadata.fullPath)
                  })
    return res
  }

  async obterImagemStorage(path){
    var res:any = false

    await firebase.storage().ref().child(path).getDownloadURL().then( r =>{
      res = r
    })

    return res
  }

  async cadastrarLoja(data, PRIMARY_KEY, PRIMARY_KEY_USUARIO) {
    delete data.imageNew
    delete data.imageDisplay
    var res:any = false

    await this.db.collection('store').doc(PRIMARY_KEY).update(data).then( r =>{
      this.update("user", PRIMARY_KEY_USUARIO, {userType:2}).then(()=>{
        this.storeOfQuantity()
      })
    })

    return res
  }


  async update(collection:string, pk:string, data:any) {
    var res:any = false

    await this.db.collection(collection).doc(pk).update(data).then( r =>{
      res = r
    })

    return res
  }

  getIdDocByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY))
  }

  getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public async storeOfQuantity() {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('countOf').doc("0FPh9yLyy34ldMYC8l8t").update({ store : increment })
  }

  public getCEP(cep) {
    return this.http.get<any[]>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}

