import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreInterface as Store } from '../interfaces/store.interface';

@Injectable({providedIn: 'root'})
export class StoreApi {

  constructor(private http: HttpClient) { }

  public getStoreByForeignKeyUser(store: Store){
    return this.http.get<Store[]>('/')
  }

  public getStoreByUid(store: Store){
    return this.http.get<Store>('/')
  }

  public createNewStore(store: Store){
    return this.http.post<Store>('/', null)
  }

  public delStoreByUid(store: Store){
    return this.http.delete<Store>('/')
  }

  public putStoreByUid(store: Store){
    return this.http.put<Store>('/', null)
  } 

}