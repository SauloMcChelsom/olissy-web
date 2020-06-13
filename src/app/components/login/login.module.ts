
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoute } from './login.route';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent]
})

export class LoginModule {}
