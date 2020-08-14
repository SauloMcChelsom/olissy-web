import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClientInterface as Client } from '../interfaces/client.interface';

@Injectable({providedIn: 'root'})
export class ClientState {

  private readonly _client = new BehaviorSubject<Client[]>([]);

  public pullClient(){
    return this._client.value[0]
  } 

  public getClient(){
    return this._client.asObservable();
  }

  public setClient(client: Client[]){
    this._client.next(client)
  }

  public addClient(){

  } 

  public PutClient(){
    this._client.next([]);
  } 

  public delClient(){
    this._client.next([]);
  } 

}