import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

import { View } from '../../../../shared/view.shared';
import { UserService, User } from '../../../../service/user.service';
import { ClientService, Client } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';

@Component({
  selector: 'mt-login',
  templateUrl: './page-of-store.component.html',
  styleUrls: ['./page-of-store.component.css']
})

export class PageOfStoreComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  public store:Store = this.storeService.store

  constructor(
    private view:View,
    private userService:UserService,
    private clientService:ClientService,
    private storeService:StoreService,
    private route: ActivatedRoute
  ){}

  public async ngOnInit() {
    this.getStore(this.route.parent.snapshot.params.id)
  }

  public getStore(PRIMARY_KEY){
    this.store.PRIMARY_KEY = PRIMARY_KEY
    this.storeService.getStoreByPrimaryKeyInApi(this.store).pipe(take(1), takeUntil(this.unsubscribe$)).subscribe((s:Store[])=>{
      this.store = s[0]
    })
  }

  public ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
} 
