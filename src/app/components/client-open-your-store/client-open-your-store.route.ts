import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientOpenYourStoreComponent } from './client-open-your-store.component';

const routes: Routes = [
  { path:'', component: ClientOpenYourStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientOpenYourStoreRoute {}
