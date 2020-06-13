import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EvaluateStoreComponent } from './evaluate-store.component';

const routes: Routes = [
  {path:'', component: EvaluateStoreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteOrdersRoute {}