import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListOfAllStoreComponent } from './list-of-all-store.component';

const routes: Routes = [
  {path: '', component: ListOfAllStoreComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ListOfAllStoreRoute {}