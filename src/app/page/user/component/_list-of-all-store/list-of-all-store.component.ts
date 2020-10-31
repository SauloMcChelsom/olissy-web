import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/view.shared';
import { StoreService, Store } from '../../../../service/store.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'mt-list-of-all-store',
  templateUrl: './list-of-all-store.component.html',
  styleUrls: ['./list-of-all-store.component.css']
})

export class ListOfAllStoreComponent implements OnInit {

  private unsubscribe$ = new Subject();

  public stores: Observable<Store[]> = this.storeService.getListOfAllStoreInApi()

  public showStore:Boolean = false
  
  constructor(
    private view:View,
    private storeService:StoreService,
  ){
    window.scroll(0,0);
    this.view.setLoader(false)
  }

  public ngOnInit() {
    this.stores.pipe(takeUntil(this.unsubscribe$)).subscribe((store)=>{
      if(Object.keys(store).length != 0){
        this.showStore = true
      }
    })
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
