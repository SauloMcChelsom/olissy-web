import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  //public subject = new Subject();

  private productDBSource = new BehaviorSubject(false);
  subject = this.productDBSource.asObservable();

  constructor() { }

  setProductDB(message: any) {
    this.productDBSource.next(message)
    //this.subject.next(message);
  }

}