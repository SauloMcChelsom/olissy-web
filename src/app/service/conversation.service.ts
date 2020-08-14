import { Injectable } from '@angular/core';
import { ConversationApi as api } from '../api/conversation.api';
import { ConversationState as state } from '../state/conversation.state';
import { ConversationInterface as Conversation } from '../interfaces/conversation.interface';
         
@Injectable({providedIn: 'root'})
export class ConversationService {

  constructor(private api: api, private state: state) {}

  public getConversationByForeignKeyUserInApi(conversation: Conversation){
    return this.api.getConversationByForeignKeyUser(conversation)
  }
 
  public getConversationByUidInApi(conversation: Conversation){
    return this.api.getConversationByUid(conversation)
  }

  public createNewConversationInApi(conversation: Conversation){
    return this.api.createNewConversation(conversation)
  }

  public putConversationByUidInApi(conversation: Conversation){
    return this.api.putConversationByUid(conversation)
  }

  public delConversationByUidInApi(conversation: Conversation){
    return this.api.delConversationByUid(conversation)
  }

  public pullConversationInState(){
    return this.state.pullConversation()
  }

  public getConversationInState(){
    return this.state.getConversation()
  }

  public setConversationInState(conversation: Conversation){
    this.state.setConversation(conversation)
  }

  public addConversationInState(){
    this.state.addConversation()
  }

  public PutConversationInState(){
    return this.state.PutConversation()
  }

  public delConversationInState(){
    return this.state.delConversation()
  }
}