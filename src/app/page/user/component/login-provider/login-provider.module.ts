
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginProviderRoute } from './login-provider.route';
import { LoginProviderComponent } from './login-provider.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LoginProviderRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginProviderComponent]
})

export class LoginProviderModule {}
