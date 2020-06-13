import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoute } from './about.route'
import { AboutComponent } from './about.component'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AboutRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [AboutComponent]
})

export class AboutModule {}