import { Injectable } from '@angular/core';
import { WarehouseApi as api } from '../api/warehouse.api';
import { WarehouseState as state } from '../state/warehouse.state';
import { WarehouseInterface as Warehouse } from '../interfaces/warehouse.interface';
         
@Injectable({providedIn: 'root'})
export class WarehouseService {

  constructor(private api: api, private state: state) {}

  public getWarehouseByForeignKeyUserInApi(warehouse: Warehouse){
    return this.api.getWarehouseByForeignKeyUser(warehouse)
  }
 
  public getWarehouseByPrimaryKeyInApi(warehouse: Warehouse){
    return this.api.getWarehouseByPrimaryKey(warehouse)
  }

  public createNewWarehouseInApi(warehouse: Warehouse){
    return this.api.createNewWarehouse(warehouse)
  }

  public putWarehouseByUidInApi(warehouse: Warehouse){
    return this.api.putWarehouseByUid(warehouse)
  }

  public delWarehouseByUidInApi(warehouse: Warehouse){
    return this.api.delWarehouseByUid(warehouse)
  }

  public sendImagemStorageInApi(name:string, image: Blob | Uint8Array | ArrayBuffer){
    return this.api.sendImagemStorage(name, image)
  }

  public pullWarehouseInState(){
    return this.state.pullWarehouse()
  }

  public getWarehouseInState(){
    return this.state.getWarehouse()
  }

  public setWarehouseInState(warehouse: Warehouse){
    this.state.setWarehouse(warehouse)
  }

  public addWarehouseInState(){
    this.state.addWarehouse()
  }

  public PutWarehouseInState(){
    return this.state.PutWarehouse()
  }

  public delWarehouseInState(){
    return this.state.delWarehouse()
  }
}