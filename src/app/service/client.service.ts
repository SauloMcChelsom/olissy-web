import { Injectable } from '@angular/core';
import { ClientApi as api } from '../api/Client.api';
import { ClientState as state } from '../state/Client.state';
import { ClientInterface as Client } from '../interfaces/Client.interface';
export { Client }

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

  public sendImagemStorageInApi(name:string, image: Blob | Uint8Array | ArrayBuffer){
    return this.api.sendImagemStorage(name, image)
  } 

  public putImagemStorageInApi(name:string, image: Blob | Uint8Array | ArrayBuffer){
    return this.api.putImagemStorage(name, image)
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

  public get client():Client{
    return {
      timestamp: '',
      FOREIGN_KEY_USER: 0,
      PRIMARY_KEY: 0,
      telephone: '',
      birth: '',
      cellPhone: '',
      cep: '',
      city: 'Acrelândia',
      country: 'Brazil',
      email: '',
      imageIconPath: 'email',
      imageIconUrl: '',
      lastName: '',
      name: '',
      neighborhood: '',
      sex: '',
      stateFederal: 'AC',
      street: '',
      foreign_key_user: 0,
      primary_key: 0,
      tele_phone: '',
      cell_phone: '',
      image_icon_path: 'email',
      image_icon_url: '',
      last_name: '',
      state_federal: 'AC'
    }
  }
}