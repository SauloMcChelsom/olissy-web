
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenMyStoreComponent } from './open-my-store.component';

const routes: Routes = [
  { path:'', component: OpenMyStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpenMyStoreRoute {}