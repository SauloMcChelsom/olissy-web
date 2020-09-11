
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebuggerRoute } from './debugger.route';
import { DebuggerComponent } from './debugger.component';


@NgModule({
  imports: [
    CommonModule,
    DebuggerRoute,
  ],
  declarations: [DebuggerComponent]
})

export class DebuggerModule {}
