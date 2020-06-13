import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class SearchStoreProductRegistrationService {

  constructor(private http: HttpClient){}

  private url = environment.apiOlissyMongoDB

  public searchProductsByRegex(search: string) {
    return this.http.get<any>(this.url + '/regex/?text=' + search);
  }

  public searchProductsByDeepSearch(search: string) {
    return this.http.get<any>(this.url + '/text/?text=' + search);
  }
}
