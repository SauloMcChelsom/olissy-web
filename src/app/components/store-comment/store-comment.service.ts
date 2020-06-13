import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})

export class StoreCommentService {

  constructor(private db: AngularFirestore){}

  public getReviewsByFOREIGN_KEY(FOREIGN_KEY_STORE, LIMIT){
    return this.db.collection('commentStore', ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE).orderBy("indexDay", "desc").limit(LIMIT)).valueChanges()
  }

  public getComments(PRIMARY_KEY_PRODUCT, LIMIT){
    return this.db.collection('commentStore', ref => ref.where("PRIMARY_KEY_PRODUCT", "==", PRIMARY_KEY_PRODUCT).orderBy("indexDay", "desc").limit(LIMIT)).valueChanges()
  }

  public getByStoreFOREIGN_KEY(FOREIGN_KEY){
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public getByUserFOREIGN_KEY(FOREIGN_KEY){
    return this.db.collection('client', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public async incrementCommet(pk){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('store').doc(pk).update({ commentStore: increment })
  }

  public async setCommet(comment){
    return this.db.collection('commentStore').add(comment).then(res => {
      this.update("commentStore", res.id, { PRIMARY_KEY: res.id });
    });
  }

  public async update(collection, pk, data: any) {
    return await this.db.collection(collection).doc(pk).update(data);
  }
}
