import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from "@angular/fire/firestore";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SearchStoreProductRecordService {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  private url = environment.apiOlissyMongoDB

  public searchProductsByRegex(search: string) {
    return this.http.get<any>(this.url + '/regex/?text=' + search);
  }

  public searchProductsByDeepSearch(search: string) {
    return this.http.get<any>(this.url + '/text/?text=' + search);
  }

  public productForProductDB(FOREIGN_KEY, PRIMARY_KEY) {
    return this.db.collection('product', ref => ref.where("FOREIGN_KEY", "==", FOREIGN_KEY)
                                                   .where("PRIMARY_KEY_PRODUCT_DB", "==", PRIMARY_KEY)).valueChanges();
  }
}
