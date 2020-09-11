import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DebuggerComponent } from './debugger.component';

const routes: Routes = [
  {path: '', component: DebuggerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DebuggerRoute {}