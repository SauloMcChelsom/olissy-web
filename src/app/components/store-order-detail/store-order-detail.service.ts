import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
export class StoreOrderDetailService {

  constructor(private db: AngularFirestore){}

  public getByOrderFOREIGN_KEY(PRIMARY_KEY){
    return this.db.collection('order', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges()
  }

  public getProductDataBase(PRIMARY_KEY_PRODUCT_DB){
    return this.db.collection('productDataBase', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY_PRODUCT_DB)).valueChanges()
  }

  public getByClientFOREIGN_KEY(FOREIGN_KEY){
    return this.db.collection('user', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public getByStoreFOREIGN_KEY(FOREIGN_KEY){
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public async update(collection:string, pk:string, data:any) {
    await this.db.collection(collection).doc(pk).update(data)
  }

  public async updateSales(pk:string) {
    var res:any = false
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('product').doc(pk).update({ sale: increment }).then( r =>{
      res = r
    })
    return res
  }

  public getReactionsProduct(FOREIGN_KEY_CLIENT, FOREIGN_KEY_PRODUCT){
    return this.db.collection('reactionsProduct', ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_CLIENT)
                                                            .where("FOREIGN_KEY_PRODUCT", "==", FOREIGN_KEY_PRODUCT))
                                                            .valueChanges()
  }

  public async deleterCollectionStorage(collection, pk) {
    return await this.db.collection(collection).doc(pk).delete().then( async(res)=>{
      return await res
    })
  }

  public async createInvoice(data) {
    return await this.db.collection('invoice').add(data)
  }

  public async incrementProductQuantities(pk, quantities){
    const increment = firebase.firestore.FieldValue.increment(quantities);
    return await this.db.collection('product').doc(pk).update({ productQuantities: increment }).then( async(res)=>{
      return await res
    })
  }

  public async incrementSale(pk){
    return await this.db.collection('store').doc(pk).update({ sale: firebase.firestore.FieldValue.increment(1) })
  }
}
