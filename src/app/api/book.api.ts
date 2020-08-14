import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookInterface as Book } from '../interfaces/book.interface';

@Injectable({providedIn: 'root'})
export class BookApi {

  constructor(private http: HttpClient) { }

  public getBookByForeignKeyUser(book: Book){
    return this.http.get<Book[]>('/')
  }

  public getBookByUid(book: Book){
    return this.http.get<Book>('/')
  }

  public createNewBook(book: Book){
    return this.http.post<Book>('/', null)
  }

  public delBookByUid(book: Book){
    return this.http.delete<Book>('/')
  }

  public putBookByUid(book: Book){
    return this.http.put<Book>('/', null)
  } 

}