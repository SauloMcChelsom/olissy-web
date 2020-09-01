
import { Injectable } from '@angular/core'; 
import { Router } from '@angular/router';

import { UserService  } from '../service/user.service';
import { ClientService  } from '../service/client.service';
import { StoreService } from '../service/store.service';

import { BookService } from '../service/book.service';
import { CommentService } from '../service/comment.service';
import { ContactService } from '../service/contact.service';
import { CompanyService } from '../service/company.service';
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
import { CompanyInterface } from '../interfaces/company.interface';
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
export { CompanyInterface as Company }
export { WarehouseInterface as Warehouse }
export { ProductInterface as  Product}



@Injectable({providedIn: 'root'})
export class Core {

  constructor(
    private _userService:UserService,
    private _clientService:ClientService,
    private _storeService:StoreService,
    private _companyService:CompanyService,
    private _warehouseService:WarehouseService,
    private _productService:ProductService,
    private redirectPageFor: Router
  ){}

  public view = {  
    user : "user" 
  }

  public user:UserInterface = {
    AUTOINCREMENT: null,
    DATE: '',
    FOREIGN_KEY_UID : '',
    PRIMARY_KEY: '',
    password: '',
    retypePassword: '',
    email: '',
    name: '',
    terms: false,
    type: 0,
  }

  public store:StoreInterface = {
    AUTOINCREMENT: null,
    DATE: '',
    FOREIGN_KEY_USER: '',
    PRIMARY_KEY: '',
    follow: 0,
    about: '',
    authorizationForOpenStore: false,
    cellPhone: '',
    cep: '',
    city: '',
    cnpj: '',
    country: '',
    credit: false,
    debit: false,
    deliveryBy: { 
      status: false,
      taxa: 0
    },
    deliveryFreeAbove:{ 
      km: 0,
      status: false,
      taxa: 0
    },
    email: '',
    hoursOfWork: '',
    imageBackGroundPath: [],
    imageBackGroundUrl: [],
    imageIconPath: '',
    imageIconUrl: '',
    money: false,
    name: '',
    negotiateRateLivery: { status: false },
    neighborhood: '',
    onlyInNeighborhood: { status: false },
    quantityOfProduct: 0,
    stateFederal: '',
    storeOpenOrClosed: false,
    street: '',
    telephone: '',
    totalOfSale: 0,
  }

  public client:ClientInterface = {
    AUTOINCREMENT: new Date(),
    DATE: '',
    FOREIGN_KEY_USER: '',
    PRIMARY_KEY: '',
    telephone: '',
    birth: '',
    cellPhone: '',
    cep: '',
    city: '',
    country: '',
    email: '',
    imageIconPath: '',
    imageIconUrl: '',
    lastName: '',
    name: '',
    neighborhood: '',
    sex: '',
    stateFederal: '',
    street: '',
  }

  public company:CompanyInterface = {
    AUTOINCREMENT: new Date(),
    PRIMARY_KEY: '',
    DATE: '',
    name: '',
    nameSearch: '',
  }

  public warehouse:WarehouseInterface = {
    AUTOINCREMENT: new Date(),
    PRIMARY_KEY: '',
    DATE:'',
    andGeneric: false,
    category: '',
    company: '',
    description: '',
    descriptionForSearch: '',
    imagePath: [],
    imageUrl: [],
    name: '',
    nameForSearch: '',
    price: 0,
    session: '',
    type: '',
  }

  public product:ProductInterface = {
    AUTOINCREMENT: '',
    DATE: '',
    FOREIGN_KEY_STORE: '',
    FOREIGN_KEY_USER: '',
    FOREIGN_KEY_WAREHOUSE: '',
    PRIMARY_KEY: '',
    price: '',
    productForSale: false,
    quantities: 0,
    totalOfComment: 0,
    totalOfLove: 0,
    totalOfSale: 0,
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

  public companyService(): CompanyService{
    return this._companyService
  }

  public warehouseService(): WarehouseService{
    return this._warehouseService
  }

  public productService(): ProductService{
    return this._productService
  }
  
} 