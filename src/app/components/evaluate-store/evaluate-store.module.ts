import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteOrdersRoute } from './evaluate-store.route';
import { EvaluateStoreComponent } from './evaluate-store.component';

@NgModule({
  imports: [
    CommonModule,
    CompleteOrdersRoute,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EvaluateStoreComponent
  ]
})

export class EvaluateStoreModule { }