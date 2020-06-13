import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class ClientHeaderService {

  constructor(private db: AngularFirestore){}

  getByFOREIGN_KEY(collection, FOREIGN_KEY_STORE, limit){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE).limit(limit)).valueChanges()
  }

  getClientByFOREIGN_KEY(collection, FOREIGN_KEY, limit){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY).limit(limit)).valueChanges()
  }

  MensagemVisualizadaCliente(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY)).valueChanges()
  }

  getByProdutoFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY)).valueChanges()
  }

  public getNewMessageByFOREIGN_KEY(FOREIGN_KEY_CLIENT){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_CLIENT",  "==", FOREIGN_KEY_CLIENT)
                                                   .where("viewStore", "==", true)).valueChanges()
  }

}
