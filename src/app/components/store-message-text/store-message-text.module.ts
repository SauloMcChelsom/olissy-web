import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { StoreMessageTextRoute } from './store-message-text.route';
import { StoreMessageTextComponent } from './store-message-text.component';
@NgModule({
  declarations: [
    StoreMessageTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule,
    StoreMessageTextRoute
  ]
})
export class StoreMessageTextModule { }
