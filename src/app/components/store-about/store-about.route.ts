import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreAboutComponent } from './store-about.component';

const routes: Routes = [
  { path:'', component: StoreAboutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreAboutRoute {}