
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOfStoreRoute } from './page-of-store.route';
import { PageOfStoreComponent } from './page-of-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PageOfStoreRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PageOfStoreComponent]
})

export class PageOfStoreModule {}
