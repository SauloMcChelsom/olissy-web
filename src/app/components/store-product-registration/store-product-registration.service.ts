import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})
export class StoreProductRegistrationService {

  constructor(private db: AngularFirestore){}

  public getAllProvider(){
    return this.db.collection('provider').valueChanges()
  }

  public getProductDatabase(productSession, productCategory, productType, andGeneric, provider){
    return this.db.collection('productDataBase', ref => ref.where("productSession", "==", productSession)
                                                            .where("productCategory", "==", productCategory)
                                                            .where("productType", "==", productType)
                                                            .where("andGeneric", "==", andGeneric)
                                                            .where("provider", "==", provider)).valueChanges()
  }

  public getAllProductDatabase(LIMIT){
    return this.db.collection('productDataBase', ref => ref.limit(LIMIT)).valueChanges()
  }

  public productSuggested(PRIMARY_KEY) {
    return this.db.collection('productDataBase', ref => ref.where('PRIMARY_KEY', "==", PRIMARY_KEY).limit(50)).valueChanges()
  }

  public getPlusProduct(LIMIT){
    console.log(LIMIT)
    return this.db.collection('productDataBase', ref => ref.limit(LIMIT)).valueChanges()
  }

  public async createProduct(product) {
    return await this.db.collection('product').add(product).then(res => {
      this.update('product', res.id, { PRIMARY_KEY:res.id }).then(()=>{
        this.storeProductQuantity(product.PRIMARY_KEY_STORE)
      })

    })
  }

  public async deletarFileStorage(path){
    let url = false
    await firebase.storage().ref().child(path).delete().then( function(r){
      url = true
    })
    return url
  }

  public async deleterCollectionStorage(collection, pk) {
    let res:any = false
    await this.db.collection(collection).doc(pk).delete().then( function(r){
      res = r
    })
    return res
  }

  public async getUrlImagemStorage(path){
    let res:any = false
    await firebase.auth().signInAnonymously().then(async function(r1) {
      await  firebase.storage().ref().child(path).getDownloadURL().then( function(r){
        res = r
      })
    });
    return res
  }

  public async update(collection:string, pk:string, data:any) {
    var res:any = false
    await this.db.collection(collection).doc(pk).update(data).then( r =>{
      res = r
    })
    return res
  }

  public getStoreByFOREIGN_KEY(FOREIGN_KEY){
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public productDataBase(LIMIT) {
    return this.db.collection('productDataBase', ref => ref.limit(LIMIT)).valueChanges();
  }
  
  public product(FOREIGN_KEY, PRIMARY_KEY) {
    return this.db.collection('product', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)
                                                   .where("PRIMARY_KEY_PRODUCT_DB", "==", PRIMARY_KEY)).valueChanges();
  }
  
  public store(FOREIGN_KEY) {
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges();
  }

  public async storeProductQuantity(pk:string) {
    var res:any = false
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('store').doc(pk).update({ productQuantity : increment }).then( r =>{
      res = r
    })
    return res
  }


}
