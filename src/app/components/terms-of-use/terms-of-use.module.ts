import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseRoute } from './terms-of-use.route';
import { TermsOfUseComponent } from './terms-of-use.component'

@NgModule({
  imports: [
    CommonModule,
    TermsOfUseRoute,
  ],
  declarations: [TermsOfUseComponent]
})

export class TermsOfUseModule {}