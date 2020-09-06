import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenMyStoreRoute } from './open-my-store.route';
import { OpenMyStoreComponent } from './open-my-store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    OpenMyStoreRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    OpenMyStoreComponent
  ]
})
export class OpenMyStoreModule {}