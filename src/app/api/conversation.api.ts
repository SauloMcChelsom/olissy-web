import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConversationInterface as Conversation } from '../interfaces/conversation.interface';

@Injectable({providedIn: 'root'})
export class ConversationApi {

  constructor(private http: HttpClient) { }

  public getConversationByForeignKeyUser(conversation: Conversation){
    return this.http.get<Conversation[]>('/')
  }

  public getConversationByUid(conversation: Conversation){
    return this.http.get<Conversation>('/')
  }

  public createNewConversation(conversation: Conversation){
    return this.http.post<Conversation>('/', null)
  }

  public delConversationByUid(conversation: Conversation){
    return this.http.delete<Conversation>('/')
  }

  public putConversationByUid(conversation: Conversation){
    return this.http.put<Conversation>('/', null)
  } 

}