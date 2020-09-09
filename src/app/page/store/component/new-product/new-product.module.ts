
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProductRoute } from './new-product.route';
import { NewProductComponent } from './new-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    NewProductRoute,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [NewProductComponent]
})

export class NewProductModule {}
