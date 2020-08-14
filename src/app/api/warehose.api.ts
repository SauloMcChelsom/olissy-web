import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WarehoseInterface as Warehose } from '../interfaces/warehose.interface';

@Injectable({providedIn: 'root'})
export class WarehoseApi {

  constructor(private http: HttpClient) { }

  public getWarehoseByForeignKeyUser(warehose: Warehose){
    return this.http.get<Warehose[]>('/')
  }

  public getWarehoseByUid(warehose: Warehose){
    return this.http.get<Warehose>('/')
  }

  public createNewWarehose(warehose: Warehose){
    return this.http.post<Warehose>('/', null)
  }

  public delWarehoseByUid(warehose: Warehose){
    return this.http.delete<Warehose>('/')
  }

  public putWarehoseByUid(warehose: Warehose){
    return this.http.put<Warehose>('/', null)
  } 

}