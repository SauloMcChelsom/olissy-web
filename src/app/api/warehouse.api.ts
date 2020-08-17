import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WarehouseInterface as Warehouse } from '../interfaces/warehouse.interface';

@Injectable({providedIn: 'root'})
export class WarehouseApi {

  constructor(private http: HttpClient) { }

  public getWarehouseByForeignKeyUser(warehouse: Warehouse){
    return this.http.get<Warehouse[]>('/')
  }

  public getWarehouseByUid(warehouse: Warehouse){
    return this.http.get<Warehouse>('/')
  }

  public createNewWarehouse(warehouse: Warehouse){
    return this.http.post<Warehouse>('/', null)
  }

  public delWarehouseByUid(warehouse: Warehouse){
    return this.http.delete<Warehouse>('/')
  }

  public putWarehouseByUid(warehouse: Warehouse){
    return this.http.put<Warehouse>('/', null)
  } 

}