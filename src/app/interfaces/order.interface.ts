export interface OrderInterface {
  indexDay?: string;
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
  storeDeliveryEstimate?: string;
  storeEmail?: string;
  storeHours?: string;
  storeImageUrl?: string;
  storeName?: string;
  storeNeighborhood?: string;
  storeStreet?: string;
  storeViewedTheOrder?: boolean;
  taxaDelivery?: number;
  taxing?: number;
  totalOrderValue?: number;
  orderDate?: string;
  note:[
    {
      FOREIGN_KEY_USER?: string;
      name?: string
      text?: string
      view?: boolean
    }
  ]
  product:[
    {
      FOREIGN_KEY_USER?: string;
      FOREIGN_KEY_WAREHOUSE?: string;
      FOREIGN_KEY_STORE?: string;
      productName?: string;
      productPrice?: number;
    }
  ]
}
