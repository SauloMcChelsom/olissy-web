import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoute } from './register.route';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterComponent]
})

export class RegisterModule { }
