import { Injectable } from '@angular/core';
import { StoreApi as api } from '../api/store.api';
import { StoreState as state } from '../state/store.state';
import { StoreInterface as Store } from '../interfaces/store.interface';
         
@Injectable({providedIn: 'root'})
export class StoreService {

  constructor(private api: api, private state: state) {}

  public getStoreByForeignKeyUserInApi(store: Store){
    return this.api.getStoreByForeignKeyUser(store)
  }
 
  public getStoreByUidInApi(store: Store){
    return this.api.getStoreByUid(store)
  }

  public createNewStoreInApi(store: Store){
    return this.api.createNewStore(store)
  }

  public putStoreByUidInApi(store: Store){
    return this.api.putStoreByUid(store)
  }

  public delStoreByUidInApi(store: Store){
    return this.api.delStoreByUid(store)
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
}