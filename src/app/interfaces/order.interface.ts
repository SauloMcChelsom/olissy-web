export interface OrderInterface {
  AUTOINCREMENT?: Date;
  DATE?: Date;
  PRIMARY_KEY?: string;
  FOREIGN_KEY_STORE?: string;
  FOREIGN_KEY_CLIENT?: string;
  clientAddressFull?: string;
  clientCellPhone?: string;
  clientCity?: string;
  clientEmail?: string;
  clientImageUrl?: string;
  clientLastName?: string;
  clientMethodPayment?: string;
  clientName?: string;
  clientNeighborhood?: string;
  clientStreet?: string;
  informChange?: number;
  orderState?: string;
  rateOfDelivery?: string;
  rateOfDeliveryDescription?: string;
  storeCNPJ?: string;
  storeCellPhone?: string;
  storeCity?: string;
  storeEmail?: string;
  storeImageUrl?: string;
  storeName?: string;
  storeNeighborhood?: string;
  storeStreet?: string;
  storeViewedTheOrder?: boolean;
  taxaDelivery?: number;
  taxing?: number;
  totalOrderValue?: number;
  product:[
    {
      FOREIGN_KEY_USER?: string;
      FOREIGN_KEY_WAREHOUSE?: string;
      FOREIGN_KEY_STORE?: string;
      productName?: string;
      productPrice?: number;
    }
  ]
  note:[
    {
      FOREIGN_KEY_USER?: string;
      name?: string
      text?: string
      view?: boolean
    }
  ]
}