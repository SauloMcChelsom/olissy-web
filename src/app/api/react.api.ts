import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactInterface as React } from '../interfaces/react.interface';

@Injectable({providedIn: 'root'})
export class ReactApi {

  constructor(private http: HttpClient) { }

  public getReactByForeignKeyUser(react: React){
    return this.http.get<React[]>('/')
  }

  public getReactByUid(react: React){
    return this.http.get<React>('/')
  }

  public createNewReact(react: React){
    return this.http.post<React>('/', null)
  }

  public delReactByUid(react: React){
    return this.http.delete<React>('/')
  }

  public putReactByUid(react: React){
    return this.http.put<React>('/', null)
  } 

}