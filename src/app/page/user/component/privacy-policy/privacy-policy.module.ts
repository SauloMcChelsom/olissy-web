import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyRoute } from './privacy-policy.route';
import { PrivacyPolicyComponent } from './privacy-policy.component'

@NgModule({
  imports: [
    CommonModule,
    PrivacyPolicyRoute,
  ],
  declarations: [PrivacyPolicyComponent]
})

export class PrivacyPolicyModule {}