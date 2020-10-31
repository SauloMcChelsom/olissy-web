import { Component, OnInit } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { ClientService } from '../../../../service/client.service';
import { StoreService, Store } from '../../../../service/store.service';

import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'mt-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})

export class InvoiceDetailComponent implements OnInit {

  private unsubscribe$ = new Subject();

  
  constructor(
    private view:View,
    private clientService:ClientService,
    private storeService:StoreService,
  ){}

  public ngOnInit() {
    this.view.setLoader(false)
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
