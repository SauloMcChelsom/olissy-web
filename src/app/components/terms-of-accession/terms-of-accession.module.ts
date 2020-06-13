import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfAccessionRoute } from './terms-of-accession.route';
import { TermsOfAccessionComponent } from './terms-of-accession.component';

@NgModule({
  imports: [
    CommonModule,
    TermsOfAccessionRoute,
  ],
  declarations: [TermsOfAccessionComponent]
})

export class TermsOfAccessionModule {}



