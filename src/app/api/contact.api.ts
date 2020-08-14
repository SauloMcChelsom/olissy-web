import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactInterface as Contact } from '../interfaces/contact.interface';

@Injectable({providedIn: 'root'})
export class ContactApi {

  constructor(private http: HttpClient) { }

  public getContactByForeignKeyUser(contact: Contact){
    return this.http.get<Contact[]>('/')
  }

  public getContactByUid(contact: Contact){
    return this.http.get<Contact>('/')
  }

  public createNewContact(contact: Contact){
    return this.http.post<Contact>('/', null)
  }

  public delContactByUid(contact: Contact){
    return this.http.delete<Contact>('/')
  }

  public putContactByUid(contact: Contact){
    return this.http.put<Contact>('/', null)
  } 

}