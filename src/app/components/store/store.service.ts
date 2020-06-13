import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(private db: AngularFirestore){}

  public obterTodosComercioPorCategoria(LIMIT) {
    //return this.db.collection('store', ref => ref.where("storeCategory", "==", "farmacia").limit(LIMIT).orderBy('follow')).valueChanges();
    return this.db.collection('store', ref => ref.where("authorizationOpenStore", "==", true)).valueChanges();
  }
}

