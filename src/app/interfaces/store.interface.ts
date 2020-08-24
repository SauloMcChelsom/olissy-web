export interface StoreInterface {
  AUTOINCREMENT: any;
  DATE: string;
  PRIMARY_KEY: string;
  FOREIGN_KEY_USER: string;
  name: string;
  imageIconPath: string;
  imageIconUrl: string;
  imageBackGroundPath: string[];
  imageBackGroundUrl: string[];
  country: string;
  stateFederal: string;
  city: string;
  neighborhood: string;
  street: string;
  cep: string;
  hoursOfWork: string;
  email: string;
  cellPhone: string;
  telephone: string;
  about: string;
  cnpj: string;
  quantityOfProduct: number;
  follow: number;
  storeOpenOrClosed: boolean;
  totalOfSale: number;
  authorizationForOpenStore: boolean;
  credit: boolean;
  debit: boolean;
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