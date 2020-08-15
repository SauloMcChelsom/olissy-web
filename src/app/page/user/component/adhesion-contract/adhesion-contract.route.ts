import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdhesionContractComponent } from './adhesion-contract.component'

const routes: Routes = [
  { path: '', component: AdhesionContractComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdhesionContractRoute {}

