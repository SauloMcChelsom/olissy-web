import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlterPerfilOfStoreRoute } from './alter-perfil-of-store.route';
import { AlterPerfilOfStoreComponent } from './alter-perfil-of-store.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    AlterPerfilOfStoreRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [
    AlterPerfilOfStoreComponent
  ]
})
export class AlterPerfilOfStoreModule {}