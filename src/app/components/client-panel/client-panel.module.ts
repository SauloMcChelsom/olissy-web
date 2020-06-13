import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientPanelRoute } from './client-panel.route';
import { ClientPanelComponent } from './client-panel.component';
@NgModule({
  imports: [
    CommonModule,
    ClientPanelRoute,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ 
    ClientPanelComponent
  ]
})
export class ClientPanelModule { }

