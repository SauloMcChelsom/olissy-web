import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactInterface as Contact } from '../interfaces/contact.interface';


@Injectable({providedIn: 'root'})
export class ContactState {

  private readonly _contact = new BehaviorSubject<any[]>([]);

  public pullContact(){
    return this._contact.value[0]
  } 

  public getContact(){
    return this._contact.asObservable();
  }

  public setContact(contact: Contact){
    this._contact.next([contact])
  }

  public addContact(){

  } 

  public PutContact(){
    this._contact.next([]);
  } 

  public delContact(){
    this._contact.next([]);
  } 

}