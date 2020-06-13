
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoute } from './store.route';
import { StoreComponent } from './store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    StoreRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [StoreComponent]
})

export class StoreModule { }
