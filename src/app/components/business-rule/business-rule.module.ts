import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRuleComponent } from './business-rule.component'
import { BusinessRuleRoute } from './business-rule.route'

@NgModule({
  declarations: [BusinessRuleComponent],
  imports: [
    CommonModule,
    BusinessRuleRoute
  ]
})
export class BusinessRuleModule { }
