import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})

export class StoreHeaderService {

  constructor(private db: AngularFirestore){}

  public MensagemVisualizadaComercio(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY)).valueChanges()
  }

  public getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public getStoreByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }
  
  public getOrderByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY)).valueChanges()
  }

  public storeOpenOrClosed(pk, type){
    this.db.collection('store').doc(pk).update({ storeOpenOrClosed: type })
  }

  public getNewMessageByFOREIGN_KEY(FOREIGN_KEY_STORE){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_STORE",  "==", FOREIGN_KEY_STORE)
                                                   .where("viewClient", "==", true)).valueChanges()
  }

}
