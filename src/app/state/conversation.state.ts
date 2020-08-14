import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConversationInterface as Conversation } from '../interfaces/conversation.interface';


@Injectable({providedIn: 'root'})
export class ConversationState {

  private readonly _conversation = new BehaviorSubject<any[]>([]);

  public pullConversation(){
    return this._conversation.value[0]
  } 

  public getConversation(){
    return this._conversation.asObservable();
  }

  public setConversation(conversation: Conversation){
    this._conversation.next([conversation])
  }

  public addConversation(){

  } 

  public PutConversation(){
    this._conversation.next([]);
  } 

  public delConversation(){
    this._conversation.next([]);
  } 

}