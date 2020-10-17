import { Injectable } from '@angular/core';
import { CommentApi as api } from '../api/comment.api';
import { CommentState as state } from '../state/comment.state';
import { CommentInterface as Comment } from '../interfaces/comment.interface';
         
@Injectable({providedIn: 'root'})
export class CommentService {

  constructor(private api: api, private state: state) {
    
  }

  public getCommentByForeignKeyUserInApi(comment: Comment){
    return this.api.getCommentByForeignKeyUser(comment)
  }
 
  public getCommentByUidInApi(comment: Comment){
    return this.api.getCommentByUid(comment)
  }

  public createNewCommentInApi(comment: Comment){
    return this.api.createNewComment(comment)
  }

  public putCommentByUidInApi(comment: Comment){
    return this.api.putCommentByUid(comment)
  }

  public delCommentByUidInApi(comment: Comment){
    return this.api.delCommentByUid(comment)
  }

  public pullCommentInState(){
    return this.state.pullComment()
  }

  public getCommentInState(){
    return this.state.getComment()
  }

  public setCommentInState(comment: Comment){
    this.state.setComment(comment)
  }

  public addCommentInState(){
    this.state.addComment()
  }

  public putCommentInState(){
    return this.state.PutComment()
  }

  public delCommentInState(){
    return this.state.delComment()
  }
}