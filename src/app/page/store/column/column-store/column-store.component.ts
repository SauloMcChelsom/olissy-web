import { Component } from '@angular/core';
import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { StoreService } from '../../../../service/store.service';


@Component({
  selector: 'app-column-store',
  templateUrl: './column-store.component.html',
  styleUrls: ['./column-store.component.css']
})

export class ColumnStoreComponent {
  public user:String = 'Usuario'
  public store:String = 'Loja'

  constructor(
    private view:View,
    private userService:UserService, 
    private storeService:StoreService, 
  ){
    this.store = this.storeService.pullStoreInState().name
    this.user = this.userService.pullUserInState().name
  }
  public async signOut() {
    this.view.setLoader(true)
    this.userService.delUserInState()
    this.storeService.delStoreInState()
    await this.userService.logoutInApi()
    this.view.setUser('user')
    this.view.redirectPageFor('/login')
  }
}
