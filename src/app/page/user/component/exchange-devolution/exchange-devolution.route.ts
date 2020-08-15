import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExchangeDevolutionComponent } from './exchange-devolution.component'

const routes: Routes = [
  { path: '', component: ExchangeDevolutionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExchangeDevolutionRoute {}
