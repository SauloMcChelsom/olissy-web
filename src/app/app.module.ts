import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { olissyWebKey }   from './private'


import { NgxMaskModule } from 'ngx-mask';
import { IMaskModule } from 'angular-imask';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { AppRoute } from './app.route';
import { AuthService } from './AuthService';

import { ClientColumnComponent } from './components/client-column/client-column.component';
import { ClientHeaderComponent } from './components/client-header/client-header.component';
import { StoreColumnComponent } from './components/store-column/store-column.component';
import { StoreHeaderComponent } from './components/store-header/store-header.component';
import { UserColumnComponent } from './components/user-column/user-column.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { SearchStoreProductRegistrationComponent } from './components/search-store-product-registration/search-store-product-registration.component';
import { SearchStoreProductRecordComponent } from './components/search-store-product-record/search-store-product-record.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { SearchStoreComponent } from './components/search-store/search-store.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientColumnComponent,
    ClientHeaderComponent,
    StoreColumnComponent,
    StoreHeaderComponent,
    UserColumnComponent,
    UserHeaderComponent,
    SearchStoreProductRegistrationComponent,
    SearchStoreProductRecordComponent,
    SearchProductComponent,
    SearchStoreComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    AngularFireModule.initializeApp(olissyWebKey),
    IMaskModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    AppRoute,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService, AngularFirestore, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
