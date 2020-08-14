import { Injectable } from '@angular/core';
import { ContactApi as api } from '../api/contact.api';
import { ContactState as state } from '../state/contact.state';
import { ContactInterface as Contact } from '../interfaces/contact.interface';
         
@Injectable({providedIn: 'root'})
export class ContactService {

  constructor(private api: api, private state: state) {}

  public getContactByForeignKeyUserInApi(contact: Contact){
    return this.api.getContactByForeignKeyUser(contact)
  }
 
  public getContactByUidInApi(contact: Contact){
    return this.api.getContactByUid(contact)
  }

  public createNewContactInApi(contact: Contact){
    return this.api.createNewContact(contact)
  }

  public putContactByUidInApi(contact: Contact){
    return this.api.putContactByUid(contact)
  }

  public delContactByUidInApi(contact: Contact){
    return this.api.delContactByUid(contact)
  }

  public pullContactInState(){
    return this.state.pullContact()
  }

  public getContactInState(){
    return this.state.getContact()
  }

  public setContactInState(contact: Contact){
    this.state.setContact(contact)
  }

  public addContactInState(){
    this.state.addContact()
  }

  public PutContactInState(){
    return this.state.PutContact()
  }

  public delContactInState(){
    return this.state.delContact()
  }
}