import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMessageTextComponent } from './client-message-text.component';

const routes: Routes = [
  {path:'', component: ClientMessageTextComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientMessageTextRoute {}
