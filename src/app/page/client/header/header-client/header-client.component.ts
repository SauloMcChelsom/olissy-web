import { Component } from '@angular/core';

import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { ClientService } from '../../../../service/client.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.css']
})

export class HeaderClientComponent {

  constructor(
    private view:View,
    private userService:UserService, 
    private clientService:ClientService, 
  ){}

  public async signOut() {
    this.view.setLoader(true)
    this.userService.delUserInState()
    this.clientService.delClientInState()
    await this.userService.logoutInApi()
    this.view.setUser('user')
    this.view.redirectPageFor('/login')
  }

}
 