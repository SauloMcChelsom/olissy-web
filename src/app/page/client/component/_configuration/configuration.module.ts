
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoute } from './configuration.route';
import { ConfigurationComponent } from './configuration.component';
import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule} from 'angular-imask';
@NgModule({
  imports: [
    CommonModule,
    ConfigurationRoute,
    NgxMaskModule,
    IMaskModule
  ],
  declarations: [ConfigurationComponent]
})

export class ConfigurationModule {}
