import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSendSucessRoute } from './order-send-sucess.route';
import { OrderSendSucessComponent } from './order-send-sucess.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
export function playerFactory() {
  return player;
}
@NgModule({
  imports: [
    CommonModule,
    OrderSendSucessRoute,
    FormsModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  declarations: [ 
    OrderSendSucessComponent
  ]
})
export class OrderSendSucessModule { }