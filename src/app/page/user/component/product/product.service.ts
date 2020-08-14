import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})

export class ProductService {

  constructor(private db: AngularFirestore){}

  public productDataBase(PRIMARY_KEY) {
    return this.db.collection('productDataBase', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges();
  }
  
  public product(LIMIT) {
    return this.db.collection('product', ref => ref.limit(LIMIT).where("productQuantities", ">", 0).where("productForSale", "==", "sim")).valueChanges();
  }
  
  public store(FOREIGN_KEY) {
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY).where("authorizationOpenStore", "==", true)).valueChanges();
  }

  public productSuggested(PRIMARY_KEY) {
    return this.db.collection('product', ref => ref.where('PRIMARY_KEY_PRODUCT_DB', "==", PRIMARY_KEY).limit(50).where("productQuantities", ">", 0).where("productForSale", "==", "sim")).valueChanges()
  }

  public storeSuggested(FOREIGN_KEY) {
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY).where("authorizationOpenStore", "==", true)).valueChanges();
  }

  public getUser(FOREIGN_KEY) {
    return this.db.collection('client', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges();
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

  public getReact(FOREIGN_KEY){
    return this.db.collection('react', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public async setReact(pk, data){
    return await this.db.collection("react").doc(pk).update({'product':firebase.firestore.FieldValue.arrayUnion(data)})
  }

  public async delReact(pk, data){
    return await this.db.collection("react").doc(pk).update({'product':firebase.firestore.FieldValue.arrayRemove(data)})
  }

  public async incrementCommet(pk){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('product').doc(pk).update({ comment: increment })
  }

  public async incrementProductQuantities(pk){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('product').doc(pk).update({ love: increment })
  }

  public async decrementProductQuantities(pk){
    const increment = firebase.firestore.FieldValue.increment(-1);
    return await this.db.collection('product').doc(pk).update({ love: increment })
  }

  public getComments(PRIMARY_KEY_PRODUCT, LIMIT){
    return this.db.collection('commentProduct', ref => ref.where("PRIMARY_KEY_PRODUCT", "==", PRIMARY_KEY_PRODUCT).orderBy("indexDay", "desc").limit(LIMIT)).valueChanges()
  }

  public async setCommet(comment){
    return this.db.collection('commentProduct').add(comment).then(res => {
      this.update("commentProduct", res.id, { PRIMARY_KEY: res.id });
    });
  }
}






