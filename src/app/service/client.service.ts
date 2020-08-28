import { Injectable } from '@angular/core';
import { ClientApi as api } from '../api/Client.api';
import { ClientState as state } from '../state/Client.state';
import { ClientInterface as Client } from '../interfaces/Client.interface';
         
@Injectable({providedIn: 'root'})
export class ClientService {

  constructor(private api: api, private state: state) {}

  public getClientByForeignKeyUserInApi(client: Client){
    return this.api.getClientByForeignKeyUser(client)
  }

  public getClientByUidInApi(client: Client){
    return this.api.getClientByUid(client)
  }

  public createNewClientInApi(client: Client){
    return this.api.createNewClient(client)
  }

  public putClientByUidInApi(client: Client){
    return this.api.putClientByUid(client)
  }

  public delClientByUidInApi(client: Client){
    return this.api.delClientByUid(client)
  }

  public  pullClientInState(){
    return this.state.pullClient()
  }

  public getClientInState(){
    return this.state.getClient()
  }

  public setClientInState(client: Client[]){
    this.state.setClient(client)
  }

  public addClientInState(){
    this.state.addClient()
  }

  public putClientInState(){
    return this.state.PutClient()
  }

  public delClientInState(){
    return this.state.delClient()
  } 

}