import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';


import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule } from 'angular-imask';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppRoute } from './app.route';
///import { AuthService } from './AuthService';

import { ColumnUserComponent } from './page/user/column/column-user/column-user.component'
import { HeaderUserComponent } from './page/user/header/header-user/header-user.component';
import { ColumnClientComponent } from './page/client/column/column-client/column-client.component'
import { HeaderClientComponent } from './page/client/header/header-client/header-client.component';
import { ColumnStoreComponent } from './page/store/column/column-store/column-store.component'
import { HeaderStoreComponent } from './page/store/header/header-store/header-store.component';


@NgModule({
  declarations: [
    AppComponent,
    ColumnUserComponent,
    HeaderUserComponent,
    ColumnClientComponent,
    HeaderClientComponent,
    ColumnStoreComponent,
    HeaderStoreComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    IMaskModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    AppRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule {}
 