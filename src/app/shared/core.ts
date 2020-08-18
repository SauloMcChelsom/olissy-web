
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';

import { UserService  } from '../service/user.service';
import { ClientService  } from '../service/client.service';
import { StoreService } from '../service/store.service';

import { BookService } from '../service/book.service';
import { CommentService } from '../service/comment.service';
import { ContactService } from '../service/contact.service';
import { ConversationService } from '../service/conversation.service';
import { InvoiceService } from '../service/invoice.service';
import { OrderService } from '../service/order.service';
import { PaymentService } from '../service/payment.service';
import { ProductService } from '../service/product.service';
import { ReactService } from '../service/react.service';
import { WarehouseService } from '../service/warehouse.service';

import { UserInterface } from '../interfaces/user.interface';
import { ClientInterface } from '../interfaces/client.interface';
import { StoreInterface } from '../interfaces/store.interface';
import { BookInterface } from '../interfaces/book.interface';
import { CommentInterface } from '../interfaces/comment.interface';
import { ContactInterface } from '../interfaces/contact.interface';
import { ConversationInterface } from '../interfaces/conversation.interface';
import { InvoiceInterface } from '../interfaces/invoice.interface';
import { OrderInterface } from '../interfaces/order.interface';
import { PaymentInterface } from '../interfaces/payment.interface';
import { ProductInterface } from '../interfaces/product.interface';
import { ReactInterface } from '../interfaces/react.interface';
import { WarehouseInterface } from '../interfaces/warehouse.interface';

export { UserInterface as User }
export { ClientInterface as Client }
export { StoreInterface as Store }


@Injectable({providedIn: 'root'})
export class Core {

  constructor(
    private _userService:UserService,
    private _clientService:ClientService,
    private _storeService:StoreService,
    private redirectPageFor: Router
  ){}

  public view = {  
    user : "user" 
  }

  public user:UserInterface = {
    FOREIGN_KEY_UID : '',
    PRIMARY_KEY: '',
    password: '',
    retypePassword: '',
    userEmail: '',
    userName: '',
    userTerms: false,
    userType: 0,
  }

  public store:StoreInterface = {
    FOREIGN_KEY_USER: '',
    PRIMARY_KEY: '',
    follow: 0,
    productQuantity: 0,
    storeAbout: '',
    storeCellPhone: '',
    storeCity: '',
    storeEmail: '',
    storeHours: '',
    storeImagePath: '',
    storeImageUrl: '',
    storeName: '',
    storeNeighborhood: '',
    storeStreet: '',
    storeTelephone: '',
  }

  public client:ClientInterface = {
    FOREIGN_KEY_USER: '',
    PRIMARY_KEY: '',
    clientBirth: '',
    clientCellPhone: '',
    clientCity: '',
    clientEmail: '',
    clientImagePath: '',
    clientImageUrl: '',
    clientLastName: '',
    clientName: '',
    clientNeighborhood: '',
    clientSex: '',
    clientStreet: '',
    clientTelephone: '',
  }

  public userService(): UserService{
    return this._userService
  }

  public clientService(): ClientService{
    return this._clientService
  }

  public storeService(): StoreService{
    return this._storeService
  }
  
} 