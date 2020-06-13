
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreOrderDetailRoute } from './store-order-detail.route';
import { StoreOrderDetailComponent } from './store-order-detail.component'
import { StoreOrderDetailPipe } from './store-order-detail.pipe'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { NoteModule } from './../note/note.module';

@NgModule({
  imports: [
    CommonModule,
    StoreOrderDetailRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule,
    NoteModule
  ],
  declarations: [StoreOrderDetailComponent, StoreOrderDetailPipe]

})

export class StoreOrderDetailModule { }
