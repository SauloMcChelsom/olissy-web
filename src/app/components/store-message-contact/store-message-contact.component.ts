import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreMessageContactService } from './store-message-contact.service'
import { AuthService } from '../../AuthService';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-store-message-contact',
  templateUrl: './store-message-contact.component.html',
  styleUrls: ['./store-message-contact.component.css']
})
export class StoreMessageContactComponent implements OnInit, OnDestroy {

  constructor(private storeMessageContactService:StoreMessageContactService, private authService:AuthService) {}

  public newMessage:null
  public ConversationView:null
  public contact:null
  public store = { storeCity:"...", storeImageUrl:"/assets/plataform/avatar.png", storeName:"...", storeCellPhone:"..." }
  private unsubscribe$ = new Subject();
  private FOREIGN_KEY_STORE:string

  ngOnInit() {
    this.isLogged().pipe(takeUntil(this.unsubscribe$)).subscribe((isLogged:any)=>{
      this.FOREIGN_KEY_STORE = isLogged.uid
      this.getNewMessage()
      this.getConversationView()
      this.getContact()
      this.getStore()
    })
  }

  public isLogged() {
    return  this.authService.isLogged()
  }

  public getNewMessage(){
    this.storeMessageContactService.getNewMessageByFOREIGN_KEY(this.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((newMessage:any)=>{
      this.newMessage = newMessage
    })
  }

  public getConversationView(){
    this.storeMessageContactService.getConversationByFOREIGN_KEY(this.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((ConversationView:any)=>{
       this.ConversationView = ConversationView
    })
  }

  public getContact(){
    this.storeMessageContactService.getContactByFOREIGN_KEY(this.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((contact:any)=>{
       this.contact = contact
    })
  }

  public getStore(){
    this.storeMessageContactService.getStoreByFOREIGN_KEY(this.FOREIGN_KEY_STORE).pipe(takeUntil(this.unsubscribe$)).subscribe((store:any)=>{
      this.store = store[0]
   })
  }
 
  public countNewMensage(msn:any):number{
    let numberOfNewMessage:number = 0
    for (const key of msn) {
      if(key.FOREIGN_KEY != this.FOREIGN_KEY_STORE && key.view == false){
        numberOfNewMessage++
      }
    }
    return numberOfNewMessage
  }

  public showLestNewMensage(msn:any):string{
    let LestMensage:string
    for (const key of msn) {
      if(key.FOREIGN_KEY != this.FOREIGN_KEY_STORE && key.view == false){
        LestMensage = key.text
      }
    }
    return LestMensage
   }  

  public showLestMensage(msn:any):string{
    let LestMensage:string = "..........."
    if(typeof msn === 'object'){
      for (const key of msn) {
        if(key.FOREIGN_KEY != this.FOREIGN_KEY_STORE){
          LestMensage = key.text
        }
        if(key.FOREIGN_KEY == this.FOREIGN_KEY_STORE){
          LestMensage = key.text
        }
      }
    }
    return LestMensage
  }

  public faCheckMensage(msn:any):boolean{
    let checkMensage:boolean = null
    if(typeof msn === 'object'){
      for (const key of msn) {
        if(key.FOREIGN_KEY == this.FOREIGN_KEY_STORE && key.view == true){
          checkMensage = true
        }
        if(key.FOREIGN_KEY == this.FOREIGN_KEY_STORE && key.view == false){
          checkMensage = false
        }
        if(key.FOREIGN_KEY != this.FOREIGN_KEY_STORE){
          checkMensage = null
        }
      }
    }
    return checkMensage
  }

   ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}