import { Injectable } from '@angular/core';
import { ReactApi as api } from '../api/react.api';
import { ReactState as state } from '../state/react.state';
import { ReactInterface as React } from '../interfaces/react.interface';
         
@Injectable({providedIn: 'root'})
export class ReactService {

  constructor(private api: api, private state: state) {}

  public getReactByForeignKeyUserInApi(react: React){
    return this.api.getReactByForeignKeyUser(react)
  }
 
  public getReactByUidInApi(react: React){
    return this.api.getReactByUid(react)
  }

  public createNewReactInApi(react: React){
    return this.api.createNewReact(react)
  }

  public putReactByUidInApi(react: React){
    return this.api.putReactByUid(react)
  }

  public delReactByUidInApi(react: React){
    return this.api.delReactByUid(react)
  }

  public pullReactInState(){
    return this.state.pullReact()
  }

  public getReactInState(){
    return this.state.getReact()
  }

  public setReactInState(react: React){
    this.state.setReact(react)
  }

  public addReactInState(){
    this.state.addReact()
  }

  public putReactInState(){
    return this.state.PutReact()
  }

  public delReactInState(){
    return this.state.delReact()
  }
}