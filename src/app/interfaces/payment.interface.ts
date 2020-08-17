export interface PaymentInterface {
  indexDay?: string;
  PRIMARY_KEY?: string;
  FOREIGN_KEY_PAYMENT?: string;
  FOREIGN_KEY_STORE?: string;
  statusPayment?: string;
  storeName ?: string;
  imageUrlStore?: string;
  openPaymentDay?: string;
  inPaymentDay?: string;
  receivedPaymentDay?: string;
  latePaymentDay?: string;
  closedPaymentDay?: string;
  totalPayment?: number;
  storeCity?: string;
  storeStreet?: string;
  storeNeighborhood?: string;
  storeCellPhone?: string;
  storeEmail?: string;
  plataformaName?: string;
  plataformaCity?: string;
  bank?: string;
  agency?: string;
  account?: string;
  plataformaStreet?: string;
  plataformaNeighborhood?: string;
  plataformaCellPhone?: string;
  plataformaEmail?: string;
  client:[
    {
      FOREIGN_KEY_INVOICE?: string;
      data?: string;
      name?: string;
      price?: number;
    }
  ]
}