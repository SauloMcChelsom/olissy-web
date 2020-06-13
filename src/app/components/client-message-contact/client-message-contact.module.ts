import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { ClientMessageContactRoute } from './client-message-contact.route';
import { ClientMessageContactComponent } from './client-message-contact.component';
@NgModule({
  declarations: [
    ClientMessageContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule,
    ClientMessageContactRoute
  ]
})
export class ClientMessageContactModule { }
