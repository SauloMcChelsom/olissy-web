
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfAllStoreRoute } from './list-of-all-store.route';
import { ListOfAllStoreComponent } from './list-of-all-store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    ListOfAllStoreRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [ListOfAllStoreComponent]
})

export class ListOfAllStoreModule {}
