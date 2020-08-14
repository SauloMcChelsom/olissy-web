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


@NgModule({
  declarations: [
    AppComponent,
    ColumnUserComponent,
    HeaderUserComponent
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
