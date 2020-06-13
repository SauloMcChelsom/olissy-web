import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})

export class EvaluateStoreService {

  constructor(private db: AngularFirestore){}

  public async comentar(data){
    return this.db.collection('commentStore').add(data).then(res => {
      this.update("commentStore", res.id, { PRIMARY_KEY: res.id });
    });
  }

  async update(collection:string, pk:string, data:any) {
    var res:any = false

    await this.db.collection(collection).doc(pk).update(data).then( r =>{
      res = r
    })

    return res
  }

  public cliente(FOREIGN_KEY_cliente){
    return this.db.collection('client', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY_cliente)).valueChanges()
  }

  public getCommentStoreCount(FOREIGN_KEY){
    return this.db.collection('commentStoreCount', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public createCommentStoreCount(data){
    return this.db.collection('commentStoreCount').add(data).then(res => {
      this.update("commentStoreCount", res.id, { PRIMARY_KEY: res.id })
    });
  }

  public async incrementcommentStoreCount(pk) {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('commentStoreCount').doc(pk).update({ count : increment })
  }

}