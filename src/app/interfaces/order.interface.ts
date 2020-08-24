export interface OrderInterface {
  AUTOINCREMENT: any;
  DATE: string;
  PRIMARY_KEY: string;
  FOREIGN_KEY_STORE: string;
  FOREIGN_KEY_CLIENT: string;
  addressFullOfClient: string;
  nameOfClient: string;
  lastNameOfClient: string;
  imageIconUrlOfClient:string;
  emailOfClient: string;
  cellPhoneOfClient: string;
  cityOfClient: string;
  neighborhoodOfClient: string;
  streetOfClient: string;
  methodPaymentOfClient: string;
  informChange: number;
  orderState: string;
  rateOfDelivery: string;
  rateOfDeliveryDescription: string;
  nameOfStore: string;
  imageIconUrlOfStore: string;
  cellPhoneOfStore: string;
  emailOfStore: string;
  cityOfStore: string;
  neighborhoodOfStore: string;
  streetOfStore: string;
  cnpjOfStore: string;
  storeViewedTheOrder: boolean;
  taxaDelivery: number;
  taxing: number;
  totalOrderValue: number;
  product:[
    {
      FOREIGN_KEY_PRODUCT: string;
      name: string;
      price: string;
    }
  ]
  note:[
    {
      FOREIGN_KEY_USER: string;
      name: string
      text: string
      view: boolean
    }
  ]
}