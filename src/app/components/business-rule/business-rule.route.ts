import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessRuleComponent } from './business-rule.component'

const routes: Routes = [
  { path: '', component: BusinessRuleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BusinessRuleRoute {} 