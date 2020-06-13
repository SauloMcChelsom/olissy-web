
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoute } from './product.route';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPipe } from './product.pipe'
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    ProductRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule, 
  ],
  declarations: [ProductComponent, ProductPipe]

})

export class ProductModule { } 

