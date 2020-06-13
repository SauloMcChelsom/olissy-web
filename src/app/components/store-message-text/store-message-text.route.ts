import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreMessageTextComponent } from './store-message-text.component';

const routes: Routes = [
  {path:'', component: StoreMessageTextComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StoreMessageTextRoute {}
