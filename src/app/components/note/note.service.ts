import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private db: AngularFirestore){}

  public async sendNote(pk, data){
    return await this.db.collection("order").doc(pk).update({'note':firebase.firestore.FieldValue.arrayUnion(data)})
  }

  public async sendReadNote(pk, data){
    await this.db.collection("order").doc(pk).update({'note':firebase.firestore.FieldValue.arrayRemove(data)}).then(()=>{
      this.db.collection("order").doc(pk).update({'note':firebase.firestore.FieldValue.arrayUnion(data)})
    })
  }

}