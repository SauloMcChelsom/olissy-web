import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StorePanelComponent } from './store-panel.component';

const routes: Routes = [
  { path: '', component: StorePanelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StorePanelModuleRoute {}
