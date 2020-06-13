import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientUserChangeRegistrationRoute } from './client-user-change-registration.route';
import { ClientUserChangeRegistrationComponent } from './client-user-change-registration.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    ClientUserChangeRegistrationRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    ClientUserChangeRegistrationComponent
  ]
})

export class ClientUserChangeRegistrationModule { }

