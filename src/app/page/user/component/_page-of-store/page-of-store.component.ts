import { Component, OnInit, OnDestroy } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mt-login',
  templateUrl: './page-of-store.component.html',
  styleUrls: ['./page-of-store.component.css']
})

export class PageOfStoreComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public store:any

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService
  ){}

  public async ngOnInit() {
    this.getStore('mw6QcFXgT1Qxzx681n8x')
  }

  public getStore(PRIMARY_KEY){
    this.storeService.store.PRIMARY_KEY = PRIMARY_KEY
    this.storeService.getStoreByPrimaryKeyInApi(this.storeService.store).pipe(take(1), takeUntil(this.unsubscribe$)).subscribe((store:Store[])=>{
      this.store = store
    })
  }


  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
