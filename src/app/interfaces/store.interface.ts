export interface StoreInterface {
  AUTOINCREMENT?: Date;
  DATE?: Date;
  PRIMARY_KEY?: string;
  FOREIGN_KEY_USER?: string;
  productQuantity?: number;
  storeAbout?: string;
  storeImagePath?: string;
  storeImageUrl?: string;
  storeName?: string;
  follow?: number;
  storeCity?: string;
  storeNeighborhood?: string;
  storeStreet?: string;
  storeCellPhone?: string;
  storeEmail?: string;
  storeTelephone?: string;
  storeHours?: string;
  sale?: number;
  storeCEP?: string;
  storeCNPJ?: string;
  storeCountry?: string;
  storeOpenOrClosed?: boolean;
  storeState?: string;
  authorizationOpenStore?: boolean;
  credit?: boolean;
  debit?: boolean;
  money:boolean;
  
  deliveryBy:{
    status:boolean;
    taxa:number;
  }

  deliveryFreeAbove:{
    km:number;
    status:boolean;
    taxa:number;
  }

  negotiateRateLivery:{
    status:boolean;
  }

  onlyInNeighborhood:{
    status:boolean;
  }

}