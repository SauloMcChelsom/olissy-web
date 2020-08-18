export interface InvoiceInterface{
  AUTOINCREMENT: Date;
  DATE: Date;
  PRIMARY_KEY: string;
  FOREIGN_KEY_CLIENT: string;
  FOREIGN_KEY_STORE: string;
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
}