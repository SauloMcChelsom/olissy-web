import { Injectable } from '@angular/core';
import { WarehoseApi as api } from '../api/warehose.api';
import { WarehoseState as state } from '../state/warehose.state';
import { WarehoseInterface as Warehose } from '../interfaces/warehose.interface';
         
@Injectable({providedIn: 'root'})
export class WarehoseService {

  constructor(private api: api, private state: state) {}

  public getWarehoseByForeignKeyUserInApi(warehose: Warehose){
    return this.api.getWarehoseByForeignKeyUser(warehose)
  }
 
  public getWarehoseByUidInApi(warehose: Warehose){
    return this.api.getWarehoseByUid(warehose)
  }

  public createNewWarehoseInApi(warehose: Warehose){
    return this.api.createNewWarehose(warehose)
  }

  public putWarehoseByUidInApi(warehose: Warehose){
    return this.api.putWarehoseByUid(warehose)
  }

  public delWarehoseByUidInApi(warehose: Warehose){
    return this.api.delWarehoseByUid(warehose)
  }

  public pullWarehoseInState(){
    return this.state.pullWarehose()
  }

  public getWarehoseInState(){
    return this.state.getWarehose()
  }

  public setWarehoseInState(warehose: Warehose){
    this.state.setWarehose(warehose)
  }

  public addWarehoseInState(){
    this.state.addWarehose()
  }

  public PutWarehoseInState(){
    return this.state.PutWarehose()
  }

  public delWarehoseInState(){
    return this.state.delWarehose()
  }
}