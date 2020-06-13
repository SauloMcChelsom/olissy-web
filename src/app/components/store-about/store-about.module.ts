import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreAboutRoute } from './store-about.route';
import { StoreAboutComponent } from './store-about.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    StoreAboutRoute,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    NgxMaskModule
  ],
  declarations: [
    StoreAboutComponent
  ]
})

export class StoreAboutModule { }

