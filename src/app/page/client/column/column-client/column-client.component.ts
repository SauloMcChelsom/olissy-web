import { Component } from '@angular/core';
import { View } from '../../../../shared/view.shared';
import { UserService } from '../../../../service/user.service';
import { ClientService } from '../../../../service/client.service';

@Component({
  selector: 'app-column-client',
  templateUrl: './column-client.component.html',
  styleUrls: ['./column-client.component.css']
})

export class ColumnClientComponent {

  public nameUser:String = 'Usuario'
  public lestNameUser:String = ''

  constructor(
    private view:View,
    private userService:UserService, 
    private clientService:ClientService, 
  ){
    this.nameUser = this.clientService.pullClientInState().name
    this.lestNameUser = this.clientService.pullClientInState().lastName
  }

  public async signOut() {
    this.view.setLoader(true)
    this.userService.delUserInState()
    this.clientService.delClientInState()
    await this.userService.logoutInApi()
    this.view.setUser('user')
    this.view.redirectPageFor('/login')
  } 
}