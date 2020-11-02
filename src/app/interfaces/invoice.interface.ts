
  interface Product{
    FOREIGN_KEY_PRODUCT?: string;
    name?: string;
    price?: number;
    totalOfPrice?:number;
    quantity?:number;
    quantities?:number;
  }
  
  interface Note{
    FOREIGN_KEY_USER: string;
    name: string
    text: string
    view: boolean
  }
  
  interface TaxaDelivery{
    description:string;
    value: string;
    taxa:number;
    km:number
  }
  
  export interface InvoiceInterface{
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
    orderState: string;
    nameOfStore: string;
    imageIconUrlOfStore: string;
    cellPhoneOfStore: string;
    emailOfStore: string;
    cityOfStore: string;
    neighborhoodOfStore: string;
    streetOfStore: string;
    cnpjOfStore: string;
    storeViewedTheOrder: boolean;
    totalOrderValue: number;
    methodPayment: string;
    informChange: string;
    taxaOfPlatform:number
    taxaDeliverySelectByClientStatus?:string
    taxaDeliverySelectByClient:TaxaDelivery,
    product:Array<Product>,
    note:Array<Note>,
  }