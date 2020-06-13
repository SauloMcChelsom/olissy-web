 
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AppService } from '../../app.service';
import { Observable, Observer } from 'rxjs';
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ClientOrderDetailAlterService {

  constructor(private db: AngularFirestore,
              private appService:AppService){}

  public getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public getStore(FOREIGN_KEY){
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }


  public update(collection, pk, data:any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public getOrder(PRIMARY_KEY){
    return this.db.collection("order", ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges()
  }

  public async changeOrder(order) {
    await  this.db.collection('order').doc(order.PRIMARY_KEY).update(order).then( async (res) =>{
      return await res
    })
  }
}

