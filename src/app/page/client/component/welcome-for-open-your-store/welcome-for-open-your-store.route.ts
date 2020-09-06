import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeForOpenYourStoreComponent } from './welcome-for-open-your-store.component';

const routes: Routes = [
  { path:'', component: WelcomeForOpenYourStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeForOpenYourStoreRoute {}