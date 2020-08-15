import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeDevolutionRoute } from './exchange-devolution.route';
import { ExchangeDevolutionComponent } from './exchange-devolution.component'

@NgModule({
  imports: [
    CommonModule,
    ExchangeDevolutionRoute,
  ],
  declarations: [ExchangeDevolutionComponent]
})

export class ExchangeDevolutionModule {}


