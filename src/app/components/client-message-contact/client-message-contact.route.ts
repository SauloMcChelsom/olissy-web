import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMessageContactComponent } from './client-message-contact.component';

const routes: Routes = [
  {path:'', component: ClientMessageContactComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientMessageContactRoute {}
