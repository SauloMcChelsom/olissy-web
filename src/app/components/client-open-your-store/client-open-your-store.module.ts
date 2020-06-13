import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientOpenYourStoreRoute } from './client-open-your-store.route';
import { ClientOpenYourStoreComponent } from './client-open-your-store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    ClientOpenYourStoreRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    ClientOpenYourStoreComponent
  ]
})
export class ClientOpenYourStoreModule {}

