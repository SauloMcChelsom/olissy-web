import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageOfStoreComponent } from './page-of-store.component';

const routes: Routes = [
  {path: '', component: PageOfStoreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PageOfStoreRoute {}