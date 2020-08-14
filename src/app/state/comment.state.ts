import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentInterface as Comment } from '../interfaces/comment.interface';


@Injectable({providedIn: 'root'})
export class CommentState {

  private readonly _comment = new BehaviorSubject<any[]>([]);

  public pullComment(){
    return this._comment.value[0]
  } 

  public getComment(){
    return this._comment.asObservable();
  }

  public setComment(comment: Comment){
    this._comment.next([comment])
  }

  public addComment(){

  } 

  public PutComment(){
    this._comment.next([]);
  } 

  public delComment(){
    this._comment.next([]);
  } 

}