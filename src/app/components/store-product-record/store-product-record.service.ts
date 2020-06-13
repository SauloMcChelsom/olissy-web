
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})
export class StoreProductRecordService {

  constructor(private db: AngularFirestore){}

  public getAllProductDatabase(){
    return this.db.collection('productDataBase').valueChanges()
  }

  public async deleterCollectionStorage(collection, pk, PRIMARY_KEY_STORE) {
    return await this.db.collection(collection).doc(pk).delete().then(()=>{
      this.storeProductQuantity(PRIMARY_KEY_STORE)
    })
  }

  public async update(collection:string, pk:string, data:any) {
    return await this.db.collection(collection).doc(pk).update(data)
  }

  public getByFOREIGN_KEY(collection, FOREIGN_KEY, LIMIT){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY) .limit(LIMIT)).valueChanges()
  }

  public getProductDataBaseByPRIMARY_KEY(PRIMARY_KEY){
    return this.db.collection('productDataBase', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges()
  }

  public productSuggested(PRIMARY_KEY) {
    return this.db.collection('product', ref => ref.where('PRIMARY_KEY_PRODUCT_DB', "==", PRIMARY_KEY).limit(50)).valueChanges()
  }


  /** */

  public productDataBase(PRIMARY_KEY) {
    return this.db.collection('productDataBase', ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges();
  }
  
  public product(FOREIGN_KEY, LIMIT) {
    return this.db.collection('product', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY).limit(LIMIT)).valueChanges();
  }

  public productForProductDB(FOREIGN_KEY, PRIMARY_KEY) {
    return this.db.collection('product', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)
                                                   .where("PRIMARY_KEY_PRODUCT_DB", "==", PRIMARY_KEY)).valueChanges();
  }
  
  public store(FOREIGN_KEY) {
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges();
  }

  public async storeProductQuantity(pk:string) {
    var res:any = false
    const increment = firebase.firestore.FieldValue.increment(-1);
    await this.db.collection('store').doc(pk).update({ productQuantity : increment }).then( r =>{
      res = r
    })
    return res
  }

}
