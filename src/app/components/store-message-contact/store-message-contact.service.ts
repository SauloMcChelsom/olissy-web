import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
 
@Injectable({
  providedIn: 'root'
})
export class StoreMessageContactService {
 
  constructor(private db: AngularFirestore){}

  public getNewMessageByFOREIGN_KEY(FOREIGN_KEY_STORE){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_STORE",  "==", FOREIGN_KEY_STORE)
                                                   .where("viewClient", "==", true)).valueChanges()
  }

  public getConversationByFOREIGN_KEY(FOREIGN_KEY_STORE){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_STORE",  "==", FOREIGN_KEY_STORE)
                                                   .where("viewClient", "==", false)).valueChanges()
  }

  public getContactByFOREIGN_KEY(FOREIGN_KEY_STORE){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_STORE",  "==", FOREIGN_KEY_STORE)).valueChanges()
  }

  public getStoreByFOREIGN_KEY(FOREIGN_KEY_STORE){
    return this.db.collection("store", ref => ref.where("FOREIGN_KEY",  "==", FOREIGN_KEY_STORE)).valueChanges()
  }
} 
 
 