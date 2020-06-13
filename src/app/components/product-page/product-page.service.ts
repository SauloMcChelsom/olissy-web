
import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { firebase } from '@firebase/app';

@Injectable({
  providedIn: 'root',
})

export class ProductPageService {

  constructor(private db: AngularFirestore){}

  public comentarios(PRIMARY_KEY_PRODUCT, LIMIT){
    return this.db.collection('commentProduct', ref => ref.where("PRIMARY_KEY_PRODUCT", "==", PRIMARY_KEY_PRODUCT).orderBy("indexDay", "desc").limit(LIMIT)).valueChanges()
  }

  public async comentar(data){
    return this.db.collection('commentProduct').add(data).then(res => {
      this.update("commentProduct", res.id, { PRIMARY_KEY: res.id });
    });
  }

  public produto(collection, PRIMARY_KEY){
    return  this.db.collection(collection, ref => ref.where("PRIMARY_KEY", "==", PRIMARY_KEY)).valueChanges()
  }

  public store(FOREIGN_KEY){
    return  this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY).where("authorizationOpenStore", "==", true)).valueChanges()
  }

  public getCommentProductCount(PRIMARY_KEY_PRODUCT){
    return this.db.collection('commentProductCount', ref => ref.where("PRIMARY_KEY_PRODUCT", "==", PRIMARY_KEY_PRODUCT)).valueChanges()
  }
 
  public createCommentProductCount(data){
    return this.db.collection('commentProductCount').add(data).then(res => {
      this.update("commentProductCount", res.id, { PRIMARY_KEY: res.id })
    });
  }

  public async incrementcommentStoreCount(pk) {
    const increment = firebase.firestore.FieldValue.increment(1);
    await this.db.collection('commentProductCount').doc(pk).update({ count : increment })
  }

  public async update(collection:string, pk:string, data:any) {
    var res:any = false
    await this.db.collection(collection).doc(pk).update(data).then(() =>{
      return res = true
    })
    return res
  }

  async criar_pontuacao(data){
    var res:any = false
    await this.db.collection('punctuation').add(data).then(async ( r:any) => {
      await this.update('punctuation', r.id, { PRIMARY_KEY:r.id }).then((rs:any) => {
        res = data.PRIMARY_KEY = r.id
        res = data
      })
    })
    return res
  }

  async criar_reacao(data, collection){
    var res:any = false
    await this.db.collection(collection).add(data).then(async (r1:any) => {
      await this.update(collection, r1.id, { PRIMARY_KEY:r1.id }).then(async(r2:any) => {
        await this.reacoes_visualizar(true, r1.id).then((r3:any) => {
          res = data.PRIMARY_KEY = r1.id
          res = data
        })
      })
    })
    return res
  }

  async criar_reacao_loja(data, collection){
    var res:any = false
    await this.db.collection(collection).add(data).then(async (r1:any) => {
      await this.update(collection, r1.id, { PRIMARY_KEY:r1.id })
    })
    return res
  }

  public cliente(FOREIGN_KEY_cliente){
    return this.db.collection('client', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY_cliente)).valueChanges()
  }

  public getStore(FOREIGN_KEY){
    return this.db.collection('store', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)).valueChanges()
  }

  public getStoreReact(FOREIGN_KEY_CLIENT, FOREIGN_KEY_STORE){
    return this.db.collection('reactionsStore', ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE)
                                                           .where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_CLIENT)).valueChanges()
  }

  public existe_reactions_store(FOREIGN_KEY_CLIENT, FOREIGN_KEY_STORE){
    return this.db.collection('reactionsStore', ref => ref.where("FOREIGN_KEY_STORE", "==", FOREIGN_KEY_STORE)
                                                           .where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_CLIENT)).valueChanges()
  }

  public reacoes(collection, FOREIGN_KEY_produto, FOREIGN_KEY_cliente){
    return  this.db.collection(collection, ref => ref.where("FOREIGN_KEY_PRODUCT", "==", FOREIGN_KEY_produto)
                                                     .where("FOREIGN_KEY_CLIENT", "==", FOREIGN_KEY_cliente)).valueChanges()
  }

  public pontuacao(collection, PRIMARY_KEY_PRODUCT){
    return  this.db.collection(collection, ref => ref.where("PRIMARY_KEY_PRODUCT", "==", PRIMARY_KEY_PRODUCT)).valueChanges()
  }

  public async amar_0(PRIMARY_KEY_pontuacao){
    const decrement = firebase.firestore.FieldValue.increment(-1);
    return await this.db.collection('product').doc(PRIMARY_KEY_pontuacao).update({ love: decrement })
  }

  public async amar_1(PRIMARY_KEY){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('product').doc(PRIMARY_KEY).update({ love: increment });
  }

  public async seguir_0(PRIMARY_KEY){
    const decrement = firebase.firestore.FieldValue.increment(-1);
    return await this.db.collection('store').doc(PRIMARY_KEY).update({ follow: decrement });
  }

  public async seguir_1(PRIMARY_KEY){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('store').doc(PRIMARY_KEY).update({ follow: increment });
  }

  public async visualizar_1(PRIMARY_KEY){
    const increment = firebase.firestore.FieldValue.increment(1);
    return await this.db.collection('product').doc(PRIMARY_KEY).update({ view: increment });
  }

  public async reacoes_amar(valor, PRIMARY_KEY){
    return await this.db.collection('reactionsProduct').doc(PRIMARY_KEY).update({ clientReactionsLove: valor });
  }

  public async reacoes_seguir(valor, PRIMARY_KEY){
    return await this.db.collection('reactionsStore').doc(PRIMARY_KEY).update({ clientReactionsFollow: valor })
  }

  public async reacoes_visualizar(valor, PRIMARY_KEY){
    return await this.db.collection('reactionsProduct').doc(PRIMARY_KEY).update({ clientReactionsView: valor })
  }
}



