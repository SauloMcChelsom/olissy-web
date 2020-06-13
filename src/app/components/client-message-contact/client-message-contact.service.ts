import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ClientMessageContactService {

  constructor(private db: AngularFirestore){}

  public getNewMessageByFOREIGN_KEY(FOREIGN_KEY_CLIENT){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_CLIENT",  "==", FOREIGN_KEY_CLIENT)
                                                   .where("viewStore", "==", true)).valueChanges()
  }

  public getConversationByFOREIGN_KEY(FOREIGN_KEY_CLIENT){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_CLIENT",  "==", FOREIGN_KEY_CLIENT)
                                                   .where("viewStore", "==", false)).valueChanges()
  }

  public getContactByFOREIGN_KEY(FOREIGN_KEY_CLIENT){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_CLIENT",  "==", FOREIGN_KEY_CLIENT)).valueChanges()
  }

  public getClientByFOREIGN_KEY(FOREIGN_KEY_CLIENT){
    return this.db.collection("client", ref => ref.where("FOREIGN_KEY",  "==", FOREIGN_KEY_CLIENT)).valueChanges()
  }
}

 