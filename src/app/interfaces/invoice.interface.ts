export interface InvoiceInterface{
  indexDay?: string;
  PRIMARY_KEY?: string;
  FOREIGN_KEY_CLIENT?: string;
  FOREIGN_KEY_STORE?: string;
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
  informChange?: string;//informa o troco
  orderDate?: string;
  orderState?: string;
  product:[
    {
      FOREIGN_KEY_USER?: string;
      FOREIGN_KEY_WAREHOUSE?: string;
      FOREIGN_KEY_STORE?: string;
      productName?: string;
      productPrice?: number;
    }
  ]
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
  taxing?: string;
  totalOrderValue?: number;
}