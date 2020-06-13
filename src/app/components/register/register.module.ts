import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoute } from './register.route';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermsOfAccessionModule } from '../terms-of-accession/terms-of-accession.module';
import { AdhesionContractModule } from '../adhesion-contract/adhesion-contract.module'
import { ExchangeDevolutionModule } from '../exchange-devolution/exchange-devolution.module'
import { PrivacyPolicyModule } from '../privacy-policy/privacy-policy.module'
import { TermsOfUseModule } from '../terms-of-use/terms-of-use.module'

@NgModule({
  imports: [
    CommonModule,
    RegisterRoute,
    FormsModule,
    ReactiveFormsModule,
    TermsOfAccessionModule,
    AdhesionContractModule,
    ExchangeDevolutionModule,
    PrivacyPolicyModule,
    TermsOfUseModule
  ],
  declarations: [RegisterComponent]
})

export class RegisterModule { }
