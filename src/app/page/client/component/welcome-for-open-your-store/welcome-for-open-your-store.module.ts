import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeForOpenYourStoreRoute } from './welcome-for-open-your-store.route';
import { WelcomeForOpenYourStoreComponent } from './welcome-for-open-your-store.component';
@NgModule({
  imports: [
    CommonModule,
    WelcomeForOpenYourStoreRoute,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    WelcomeForOpenYourStoreComponent
  ]
})
export class WelcomeForOpenYourStoreModule { }