import { Component } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { StoreService } from '../../../../service/store.service';

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.css']
})

export class HeaderStoreComponent {

  constructor(
    private view:View,
    private userService:UserService, 
    private storeService:StoreService, 
  ){}

  public async signOut() {
    this.view.setLoader(true)
    this.userService.delUserInState()
    this.storeService.delStoreInState()
    await this.userService.logoutInApi()
    this.view.setUser('user')
    this.view.redirectPageFor('/login')
  }

}
 