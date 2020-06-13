import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';
import { TermsOfAccessionComponent } from '../terms-of-accession/terms-of-accession.component';
import { AdhesionContractComponent } from '../adhesion-contract/adhesion-contract.component'
import { ExchangeDevolutionComponent } from '../exchange-devolution/exchange-devolution.component'
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component'
import { TermsOfUseComponent } from '../terms-of-use/terms-of-use.component'

const routes: Routes = [

  {path:'', component: RegisterComponent,
    children:[
      {path:'terms-of-accession', component: TermsOfAccessionComponent},
      {path:'adhesion-contract', component: AdhesionContractComponent},
      {path:'exchange-devolution', component: ExchangeDevolutionComponent},
      {path:'privacy-policy', component: PrivacyPolicyComponent},
      {path:'terms-of-use', component: TermsOfUseComponent}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegisterRoute {}