import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BookInterface as Book } from '../interfaces/book.interface';


@Injectable({providedIn: 'root'})
export class BookState {

  private readonly _book = new BehaviorSubject<any[]>([]);

  public pullBook(){
    return this._book.value[0]
  } 

  public getBook(){
    return this._book.asObservable();
  }

  public setBook(book: Book){
    this._book.next([book])
  }

  public addBook(){

  } 

  public PutBook(){
    this._book.next([]);
  } 

  public delBook(){
    this._book.next([]);
  } 

}