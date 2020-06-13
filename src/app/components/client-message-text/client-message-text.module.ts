import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { ClientMessageTextRoute } from './client-message-text.route';
import { ClientMessageTextComponent } from './client-message-text.component';
@NgModule({
  declarations: [
    ClientMessageTextComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule,
    ClientMessageTextRoute
  ]
})
export class ClientMessageTextModule { }
