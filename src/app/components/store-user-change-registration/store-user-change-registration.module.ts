import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreUserChangeRegistrationRoute } from './store-user-change-registration.route';
import { StoreUserChangeRegistrationComponent } from './store-user-change-registration.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule } from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    StoreUserChangeRegistrationRoute,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule
  ],
  declarations: [StoreUserChangeRegistrationComponent]
})

export class StoreUserChangeRegistrationModule {}
