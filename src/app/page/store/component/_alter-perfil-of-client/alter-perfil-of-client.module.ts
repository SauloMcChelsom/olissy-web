
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlterPerfilOfClientRoute } from './alter-perfil-of-client.route';
import { AlterPerfilOfClientComponent } from './alter-perfil-of-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    AlterPerfilOfClientRoute,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [AlterPerfilOfClientComponent]
})

export class AlterPerfilOfClientModule {}
