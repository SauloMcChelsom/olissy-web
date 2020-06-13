import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutDeveloperRoute } from './about-developer.route';
import { AboutDeveloperComponent } from './about-developer.component'

@NgModule({
  imports: [
    CommonModule,
    AboutDeveloperRoute,
  ],
  declarations: [AboutDeveloperComponent]
})

export class AboutDeveloperModule {}

