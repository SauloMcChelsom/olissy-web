import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { StoreMessageContactRoute } from './store-message-contact.route';
import { StoreMessageContactComponent } from './store-message-contact.component';
@NgModule({
  declarations: [
    StoreMessageContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule,
    StoreMessageContactRoute
  ]
})
export class StoreMessageContactModule { }
