import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
//import { Router, NavigationEnd } from '@angular/router'
declare var $ :any;

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})

export class UserHeaderComponent {
  
  public search:boolean = false

  public url:boolean = false

  constructor(private data: DataService) {}

  /*
  constructor(private data: DataService, private router: Router) {
    router.events.subscribe(() => {
      this.getRouterReloadPage()
    });
  }

  public getRouterReloadPage(){
    let router = window.location.href.split('/' ) 
    if(router[3]  == 'store-page'){
      this.url = true
    }else{
      this.url = false
    }
    console.log(this.url, router[3])
  }*/

  public searchProductDB_Output(productDB){
    $('#displaySearch').modal('hide')
    this.data.setProductDB(productDB)
  }
}
