
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoute } from './home.route';
import { HomeComponent } from './home.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    HomeRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [HomeComponent]
})

export class HomeModule {}
