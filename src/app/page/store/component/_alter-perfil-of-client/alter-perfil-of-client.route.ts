import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterPerfilOfClientComponent } from './alter-perfil-of-client.component';

const routes: Routes = [
  {path: '', component: AlterPerfilOfClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AlterPerfilOfClientRoute {}