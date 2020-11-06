import { Injectable } from '@angular/core';
import { StoreApi as api } from '../api/store.api';
import { StoreState as state } from '../state/store.state';
import { StoreInterface as Store } from '../interfaces/store.interface';
export { Store }

@Injectable({providedIn: 'root'})
export class StoreService {

  constructor(private api: api, private state: state) {}

  public getStoreByForeignKeyUserInApi(store: Store){
    return this.api.getStoreByForeignKeyUser(store)
  }
 
  public getStoreByPrimaryKeyInApi(store: Store){
    return this.api.getStoreByPrimaryKey(store)
  }

  public getListOfAllStoreInApi(){
    return this.api.getListOfAllStore()
  }

  public createNewStoreInApi(store: Store){
    return this.api.createNewStore(store)
  }

  public putStoreByUidInApi(store: Store){
    return this.api.putStoreByUid(store)
  }

  public putImagemStorageInApi(name:string, image: Blob | Uint8Array | ArrayBuffer){
    return this.api.putImagemStorage(name, image)
  } 

  public delStoreByUidInApi(store: Store){
    return this.api.delStoreByUid(store)
  }

  public updateQuantityOfProductInStoreForPlusInApi(store: Store){
    return this.api.updateQuantityOfProductInStoreForPlus(store)
  }

  public updateQuantityOfProductInStoreForLessInApi(store: Store){
    return this.api.updateQuantityOfProductInStoreForLess(store)
  }

  public updateTotalOfSaleInApi(store: Store){
    return this.api.updateTotalOfSale(store)
  }

  public sendImagemStorageInApi(name:string, image: Blob | Uint8Array | ArrayBuffer){
    return this.api.sendImagemStorage(name, image)
  }

  public pullStoreInState(){
    return this.state.pullStore()
  }

  public getStoreInState(){
    return this.state.getStore()
  }

  public setStoreInState(store: Store){
    this.state.setStore(store)
  }

  public addStoreInState(){
    this.state.addStore()
  }

  public putStoreInState(){
    return this.state.PutStore()
  }

  public delStoreInState(){
    return this.state.delStore()
  }

  public get store():Store {
    return {
      AUTOINCREMENT: null,
      DATE: '',
      FOREIGN_KEY_USER: '',
      PRIMARY_KEY: '',
      follow: 0,
      about: '',
      authorizationForOpenStore: false,
      cellPhone: '',
      cep: '',
      city: 'Acrelândia',
      cnpj: '',
      country: 'Brazil',
      credit: false,
      debit: false,
      deliveryBy: { 
        status: false,
        taxa: 0
      },
      deliveryFreeAbove:{ 
        km: 0,
        status: false,
        taxa: 0
      },
      email: '',
      hoursOfWork: '',
      imageBackGroundPath: ["/plataform/wallpaper.jpg"],
      imageBackGroundUrl: ["https://firebasestorage.googleapis.com/v0/b/olissy-web-test.appspot.com/o/plataform%2Fwallpaper.jpg?alt=media&token=828ad8dd-dc7c-41de-9c31-3378a8e8ecee"],
      imageIconPath: '',
      imageIconUrl: '',
      money: false,
      name: '',
      negotiateRateDelivery: { status: false },
      neighborhood: '',
      onlyInNeighborhood: { status: false },
      quantityOfProduct: 0,
      stateFederal: 'AC',
      storeOpenOrClosed: false,
      street: '',
      telephone: '',
      totalOfSale: 0,
    }
  }
}
