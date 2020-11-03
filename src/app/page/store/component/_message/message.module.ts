
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoute } from './message.route';
import { MessageComponent } from './message.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    MessageRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [MessageComponent]
})

export class MessageModule {}
