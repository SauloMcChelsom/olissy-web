import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformRoute } from './platform.route'
import { PlatformComponent } from './platform.component'

@NgModule({
  imports: [
    CommonModule,
    PlatformRoute,
  ],
  declarations: [PlatformComponent]
})

export class PlatformModule {}