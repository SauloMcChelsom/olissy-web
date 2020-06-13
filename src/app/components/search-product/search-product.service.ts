import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root',
})

export class SearchProductService {

  constructor(private http: HttpClient, private db: AngularFirestore){}

  private url = environment.apiOlissyMongoDB

  public searchProductsByRegex(search: string) {
    return this.http.get<any>(this.url + '/regex/?text=' + search);
  }

  public searchProductsByDeepSearch(search: string) {
    return this.http.get<any>(this.url + '/text/?text=' + search);
  }

  public productForProductDB(PRIMARY_KEY) {
    return this.db.collection('product', ref => ref.where("PRIMARY_KEY_PRODUCT_DB", "==", PRIMARY_KEY)
                                                   .where("productQuantities", ">", 0).limit(1)).valueChanges();
  }
}
