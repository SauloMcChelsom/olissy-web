import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WarehouseInterface as Warehouse } from '../interfaces/warehouse.interface';


@Injectable({providedIn: 'root'})
export class WarehouseState {

  private readonly _warehouse = new BehaviorSubject<any[]>([]);

  public pullWarehouse(){
    return this._warehouse.value[0]
  } 

  public getWarehouse(){
    return this._warehouse.asObservable();
  }

  public setWarehouse(warehouse: Warehouse){
    this._warehouse.next([warehouse])
  }

  public addWarehouse(){

  } 

  public PutWarehouse(){
    this._warehouse.next([]);
  } 

  public delWarehouse(){
    this._warehouse.next([]);
  } 

}