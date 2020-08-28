import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CompanyInterface as Company } from '../interfaces/company.interface';


@Injectable({providedIn: 'root'})
export class CompanyState {

  private readonly _company = new BehaviorSubject<any[]>([]);

  public pullCompany(){
    return this._company.value[0]
  } 

  public getCompany(){
    return this._company.asObservable();
  }

  public setCompany(company: Company){
    this._company.next([company])
  }

  public addCompany(){

  } 

  public PutCompany(){
    this._company.next([]);
  } 

  public delCompany(){
    this._company.next([]);
  } 

}