import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentListService {

  constructor(private db: AngularFirestore, private http: HttpClient){}

  public async AddStoreListStatePayment(store){
    return await this.db.collection('storeListStatePayment').add(store).then(async(res:any) => {
      return await this.db.collection('storeListStatePayment').doc(res.id).update({ PRIMARY_KEY:res.id }).then(async(res:any) => {
        return await "santos"
      })
    })
  }

  public async AddStoreListPayment(PRIMARY_KEY, data) {
    return await this.db.collection("storePayment").doc(PRIMARY_KEY).update({'client':firebase.firestore.FieldValue.arrayUnion(data)}).then(async(res) => {
      const increment = firebase.firestore.FieldValue.increment(0.25);
      return await this.db.collection('storePayment').doc(PRIMARY_KEY).update({ totalPayment: increment }).then(async(res:any) => {
        return await "saulo"
      })
    })
  }

  public getStoreListStatePayment(PRIMARY_KEY_ADMIN_PAYMENT, FOREIGN_KEY_STORE){
    return this.db.collection('storeListStatePayment', ref => ref.where("PRIMARY_KEY_ADMIN_PAYMENT", "==", PRIMARY_KEY_ADMIN_PAYMENT)
                                                                 .where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE).limit(1)).valueChanges()
  }

  public getOneStorePayment(PRIMARY_KEY_ADMIN_PAYMENT, FOREIGN_KEY_STORE){
    return this.db.collection('storePayment', ref => ref.where("PRIMARY_KEY_ADMIN_PAYMENT", "==", PRIMARY_KEY_ADMIN_PAYMENT)
                                                                 .where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE).limit(1)).valueChanges()
  }

  public getAdminPayment(){
    return this.db.collection('adminPayment', ref => ref.orderBy("indexDay", "desc").limit(2)).valueChanges()
  }

  public getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  async setStorePayment(payment){
    return await this.db.collection('storePayment').add(payment).then(res => {
      this.db.collection('storePayment').doc(res.id).update({ PRIMARY_KEY:res.id })
    })
  }

  public getStorePayment(FOREIGN_KEY_STORE){
    return this.db.collection('storePayment', ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE).orderBy("indexDay", "desc")).valueChanges()
  }

  public async updateStatusPayment(pk:string, data:any){
    return await this.db.collection('storePayment').doc(pk).update(data)
  }

  public async updateStoreListStatePayment(pk:string, data:any){
    return await this.db.collection('storeListStatePayment').doc(pk).update(data)
  }

  public getByPRIMARY_KEY_ADMIN_PAYMENT(PRIMARY_KEY_ADMIN_PAYMENT, FOREIGN_KEY_STORE) {
    return this.db.collection('storeListStatePayment', ref =>ref.where('PRIMARY_KEY_ADMIN_PAYMENT', '==', PRIMARY_KEY_ADMIN_PAYMENT)
                                                                .where('FOREIGN_KEY_STORE', '==', FOREIGN_KEY_STORE)).valueChanges();
  }

  public async addTaxingAdmin(PRIMARY_KEY){
    const increment = firebase.firestore.FieldValue.increment(0.25);
    return await this.db.collection('adminPayment').doc(PRIMARY_KEY).update({ value: increment }).then(async(res:any) => {
      return await "silva"
    })
  }

  public getTimeZone() {

     const headers = new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
      'Accept': 'application/json'
    })
    return this.http.get<any[]>("https://worldtimeapi.org/api/timezone/America/Sao_Paulo", { headers: headers});
  }

}
