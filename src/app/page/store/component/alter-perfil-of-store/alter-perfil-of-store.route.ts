
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterPerfilOfStoreComponent } from './alter-perfil-of-store.component';

const routes: Routes = [
  { path:'', component: AlterPerfilOfStoreComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlterPerfilOfStoreRoute {}