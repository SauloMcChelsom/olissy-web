import { Injectable } from '@angular/core';
import { BookApi as api } from '../api/book.api';
import { BookState as state } from '../state/book.state';
import { BookInterface as Book } from '../interfaces/book.interface';
         
@Injectable({providedIn: 'root'})
export class BookService {

  constructor(private api: api, private state: state) {}

  public getBookByForeignKeyUserInApi(book: Book){
    return this.api.getBookByForeignKeyUser(book)
  }
 
  public getBookByUidInApi(book: Book){
    return this.api.getBookByUid(book)
  }

  public createNewBookInApi(book: Book){
    return this.api.createNewBook(book)
  }

  public putBookByUidInApi(book: Book){
    return this.api.putBookByUid(book)
  }

  public delBookByUidInApi(book: Book){
    return this.api.delBookByUid(book)
  }

  public pullBookInState(){
    return this.state.pullBook()
  }

  public getBookInState(){
    return this.state.getBook()
  }

  public setBookInState(book: Book){
    this.state.setBook(book)
  }

  public addBookInState(){
    this.state.addBook()
  }

  public putBookInState(){
    return this.state.PutBook()
  }

  public delBookInState(){
    return this.state.delBook()
  }
}