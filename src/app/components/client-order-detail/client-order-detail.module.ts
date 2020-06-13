
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientOrderDetailRoute } from './client-order-detail.route';
import { ClientOrderDetailComponent } from './client-order-detail.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
import { ClientOrderDetailPipe } from './client-order-detail.pipe'
import { NoteModule } from './../note/note.module';

@NgModule({
  imports: [
    CommonModule,
    ClientOrderDetailRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule,
    NoteModule
  ],
  declarations: [ClientOrderDetailComponent, ClientOrderDetailPipe]

})

export class ClientOrderDetailModule { }
