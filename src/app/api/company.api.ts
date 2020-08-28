import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

import { CompanyInterface as Company } from '../interfaces/company.interface';

@Injectable({providedIn: 'root'})
export class CompanyApi {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  public getCompany(){
    return this.db.collection<Company>('company').valueChanges()
  }

  public getCompanyByName(company: Company){
    return this.db.collection('company', ref =>ref.where('nameSearch', '==', company.nameSearch)).valueChanges()
  }

  public getCompanyByUid(company: Company){
    return this.http.get<Company>('/')
  }

  public async createNewCompany(company: Company){
    company.AUTOINCREMENT = firebase.firestore.FieldValue.serverTimestamp()
    company.DATE = new Date().toString()

    await this.db.collection('company').add(company).then((res: any) => company.PRIMARY_KEY = res.id);
    await this.update('company', company.PRIMARY_KEY, { PRIMARY_KEY: company.PRIMARY_KEY })

    return company
  }

  public delCompanyByUid(company: Company){
    return this.http.delete<Company>('/')
  }

  public putCompanyByUid(company: Company){
    return this.http.put<Company>('/', null)
  } 

  public update(collection, pk, data: any) {
    return this.db.collection(collection).doc(pk).update(data);
  }

}