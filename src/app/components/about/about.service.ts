import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})

export class AboutService {

  constructor(private db: AngularFirestore){}

   public sendMensagem(mensagem){
    this.db.collection("mensagens").add(mensagem)
  }
}