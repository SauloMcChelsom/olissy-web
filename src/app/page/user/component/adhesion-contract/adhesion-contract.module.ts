import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdhesionContractRoute } from './adhesion-contract.route';
import { AdhesionContractComponent } from './adhesion-contract.component'

@NgModule({
  imports: [
    CommonModule,
    AdhesionContractRoute,
  ],
  declarations: [AdhesionContractComponent]
})

export class AdhesionContractModule {}