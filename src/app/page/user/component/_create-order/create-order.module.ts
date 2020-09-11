
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderRoute } from './create-order.route';
import { CreateOrderComponent } from './create-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    CreateOrderRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [CreateOrderComponent]
})

export class CreateOrderModule {}
