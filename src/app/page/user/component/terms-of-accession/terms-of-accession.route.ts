import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfAccessionComponent } from './terms-of-accession.component';

const routes: Routes = [
  { path: '', component: TermsOfAccessionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TermsOfAccessionRoute {}