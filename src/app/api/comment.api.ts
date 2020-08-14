import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentInterface as Comment } from '../interfaces/comment.interface';

@Injectable({providedIn: 'root'})
export class CommentApi {

  constructor(private http: HttpClient) { }

  public getCommentByForeignKeyUser(comment: Comment){
    return this.http.get<Comment[]>('/')
  }

  public getCommentByUid(comment: Comment){
    return this.http.get<Comment>('/')
  }

  public createNewComment(comment: Comment){
    return this.http.post<Comment>('/', null)
  }

  public delCommentByUid(comment: Comment){
    return this.http.delete<Comment>('/')
  }

  public putCommentByUid(comment: Comment){
    return this.http.put<Comment>('/', null)
  } 

}