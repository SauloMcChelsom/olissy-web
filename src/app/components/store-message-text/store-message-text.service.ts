import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
export class StoreMessageTextService {

  constructor(private db: AngularFirestore){}

  public getMessageByFOREIGN_KEY(PRIMARY_KEY){
    return this.db.collection("contact", ref => ref.where("PRIMARY_KEY",  "==", PRIMARY_KEY)).valueChanges()
  }



  public getStoreByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY",  "==", FOREIGN_KEY)).valueChanges()
  }
  
  public sendMessage(pk, data) {
    this.db.collection("contact").doc(pk).update({'message':firebase.firestore.FieldValue.arrayUnion(data)})
  }

  public async markMessageHowViewed(collection, pk, data){
    await this.db.collection(collection).doc(pk).update(data)
  }

}

