import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';


@Injectable({
  providedIn: 'root',
})

export class ClientOrderService {

  constructor(private db: AngularFirestore){}

  public getOrder(FOREIGN_KEY){
    return this.db.collection('order', ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY).orderBy("indexDay", "desc")).valueChanges()
  }


}
