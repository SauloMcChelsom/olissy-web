import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';


@Injectable({
  providedIn: 'root',
})
export class StorePageService {

  constructor(private db: AngularFirestore){}

  public store(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY).where("authorizationOpenStore", "==", true)).valueChanges()
  }
  
  public getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public getContact(FOREIGN_KEY_STORE, FOREIGN_KEY_CLIENT){
    return this.db.collection("message", ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_CLIENT)
                                                   .where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE)).valueChanges()
  }

  public existContactStoreEndClient(FOREIGN_KEY_CLIENT, FOREIGN_KEY_STORE){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_CLIENT)
                                                   .where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE)).valueChanges()
  }

  public async criarContact(newContact) {
    delete newContact.message
    return this.db.collection("contact").add(newContact)
  }

  public updateContactEndRedirectToMessage(collection, pk, data:any) {
    return this.db.collection(collection).doc(pk).update(data)
  }

  
  public getReact(FOREIGN_KEY){
    return  this.db.collection('react', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public async react(FOREIGN_KEY){

    let react = {
      FOREIGN_KEY : FOREIGN_KEY,
      PRIMARY_KEY : null,
      product : [],
      store : []
    }

    return await this.db.collection('react').add(react).then(async(res:any) => {
      return await this.update('react', res.id, { PRIMARY_KEY: res.id });
    });
  }

  public async update(collection, pk, data: any) {
    return await this.db.collection(collection).doc(pk).update(data);
  }

  public async setReact(pk, data){
    return await this.db.collection("react").doc(pk).update({'store':firebase.firestore.FieldValue.arrayUnion(data)})
  }

  public async delReact(pk, data){
    return await this.db.collection("react").doc(pk).update({'store':firebase.firestore.FieldValue.arrayRemove(data)})
  }

  public async incrementFollowQuantities(pk){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('store').doc(pk).update({ follow: increment })
  }

  public async decrementFollowQuantities(pk){
    const increment = firebase.firestore.FieldValue.increment(-1);
    return await this.db.collection('store').doc(pk).update({ follow: increment })
  }

}
