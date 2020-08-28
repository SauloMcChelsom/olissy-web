
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { WarehouseRoute } from './warehouse.route';
import { WarehouseComponent } from './warehouse.component';

@NgModule({
  imports: [
    CommonModule,
    WarehouseRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [WarehouseComponent]
})

export class WarehouseModule {}