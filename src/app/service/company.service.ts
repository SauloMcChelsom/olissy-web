import { Injectable } from '@angular/core';
import { CompanyApi as api } from '../api/company.api';
import { CompanyState as state } from '../state/company.state';
import { CompanyInterface as Company } from '../interfaces/company.interface';
         
@Injectable({providedIn: 'root'})
export class CompanyService {

  constructor(private api: api, private state: state) {}

  public getCompany(){
    return this.api.getCompany()
  }

  public getCompanyByName(company: Company){
    return this.api.getCompanyByName(company)
  }
 
  public getCompanyByUidInApi(company: Company){
    return this.api.getCompanyByUid(company)
  }

  public createNewCompanyInApi(company: Company){
    return this.api.createNewCompany(company)
  }

  public putCompanyByUidInApi(company: Company){
    return this.api.putCompanyByUid(company)
  }

  public delCompanyByUidInApi(company: Company){
    return this.api.delCompanyByUid(company)
  }

  public pullCompanyInState(){
    return this.state.pullCompany()
  }

  public getCompanyInState(){
    return this.state.getCompany()
  }

  public setCompanyInState(company: Company){
    this.state.setCompany(company)
  }

  public addCompanyInState(){
    this.state.addCompany()
  }

  public putCompanyInState(){
    return this.state.PutCompany()
  }

  public delCompanyInState(){
    return this.state.delCompany()
  }
}