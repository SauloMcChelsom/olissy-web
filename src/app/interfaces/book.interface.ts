export interface BookInterface {
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
  totalPayment?: string;
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
      PRIMARY_KEY?: string;
      data?: string;
      name?: string;
      price?: string;
    }
  ]
}
