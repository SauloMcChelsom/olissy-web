import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WarehoseInterface as Warehose } from '../interfaces/warehose.interface';


@Injectable({providedIn: 'root'})
export class WarehoseState {

  private readonly _warehose = new BehaviorSubject<any[]>([]);

  public pullWarehose(){
    return this._warehose.value[0]
  } 

  public getWarehose(){
    return this._warehose.asObservable();
  }

  public setWarehose(warehose: Warehose){
    this._warehose.next([warehose])
  }

  public addWarehose(){

  } 

  public PutWarehose(){
    this._warehose.next([]);
  } 

  public delWarehose(){
    this._warehose.next([]);
  } 

}