import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutDeveloperComponent } from './about-developer.component'

const routes: Routes = [
  { path: '', component: AboutDeveloperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AboutDeveloperRoute {}