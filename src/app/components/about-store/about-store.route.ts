import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutStoreComponent } from './about-store.component';

const routes: Routes = [
  {path:'', component: AboutStoreComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AboutStoreRoute {}
