import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StoreInterface as Store } from '../interfaces/store.interface';


@Injectable({providedIn: 'root'})
export class StoreState {

  private readonly _store = new BehaviorSubject<any[]>([]);

  public pullStore(){
    return this._store.value[0]
  } 

  public getStore(){
    return this._store.asObservable();
  }

  public setStore(store: Store){
    this._store.next([store])
  }

  public addStore(){

  } 

  public PutStore(){
    this._store.next([]);
  } 

  public delStore(){
    this._store.next([]);
  } 

}