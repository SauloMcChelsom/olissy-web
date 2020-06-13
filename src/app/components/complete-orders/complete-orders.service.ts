import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AppService } from '../../app.service';
import { Observable, Observer } from 'rxjs';
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})
export class CompleteOrdersService {

  constructor(private db: AngularFirestore,
              private appService:AppService){}

  public getByFOREIGN_KEY(collection, FOREIGN_KEY){
    return this.db.collection(collection, ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public async criarPedido(collection, data) {
    let order = JSON.parse(JSON.stringify(data))
    var resposta:any = false
    await this.db.collection(collection).add(order).then(res => {
      this.update(collection, res.id, {PRIMARY_KEY:res.id}).then(r=>{
        resposta = r
      })
    })
    return resposta
  }

  public update(collection, pk, data:any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

  public setPedido(pedido:any):Observable<boolean[]>{
    this.appService.pedido = pedido
    return  Observable.create( (observer:Observer<boolean>)=>{
      observer.next(true)
    })
  }

  public getPedido():Observable<any[]>{
    return Observable.create( (observer:Observer<any>)=>{
      observer.next(this.appService.pedido)
    })
  }

  public async decrementProductQuantities(pk, quantities){
    var res:any = false
    const increment = firebase.firestore.FieldValue.increment(-(quantities));
    await this.db.collection('product').doc(pk).update({ productQuantities: increment }).then( r =>{
      res = r
    })
    return res
  }

  public existContactStoreEndClient(FOREIGN_KEY_CLIENT, FOREIGN_KEY_STORE){
    return this.db.collection("contact", ref => ref.where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_CLIENT)
                                                   .where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE)).valueChanges()
  }

  public async criarContactInOrder(newContact) {
    return this.db.collection("contact").add(newContact)
  }

  public updateMessage(collection, pk, data:any) {
    return this.db.collection(collection).doc(pk).update(data)
  }

  public async markMessageHowViewed(pk){
    await this.db.collection('contact').doc(pk).update({ viewClient : true })
  }

  public sendMessage(pk, data) {
    console.log("sendMessage",pk)
    return this.db.collection("contact").doc(pk).update({'message':firebase.firestore.FieldValue.arrayUnion(data)})
  }
}

