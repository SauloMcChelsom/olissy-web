
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorePageRoute } from './store-page.route';
import { StoreProductComponent } from '../../components/store-product/store-product.component';
import { StoreCommentComponent } from '../../components/store-comment/store-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';
import { StorePageComponent } from './store-page.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { AppComponentPipe } from '../../app.component.pipe' 

@NgModule({
  imports: [
    CommonModule,
    StorePageRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    StoreCommentComponent,
    StoreProductComponent,
    ShoppingCartComponent,
    StorePageComponent,
    AppComponentPipe
  ]
})

export class StorePageModule { }