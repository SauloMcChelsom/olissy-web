export interface PaymentInterface {
  AUTOINCREMENT: any;
  DATE: string;
  PRIMARY_KEY: string;
  FOREIGN_KEY_BOOK: string;
  FOREIGN_KEY_STORE: string;

  nameOfStore: string;
  imageIconUrlOfStore: string;
  cityOfStore: string;
  neighborhoodOfStore: string;
  streetOfStore: string;
  emailOfStore: string;
  cellPhoneOfStore: string;

  openPaymentDay: string;
  inPaymentDay: string;
  receivedPaymentDay: string;
  latePaymentDay: string;
  closedPaymentDay: string;
  totalPayment: number;
  statusPayment: string;

  nameOfplataform: string;
  cityOfplataform: string;
  neighborhoodOfplataform: string;
  streetOfplataform: string;
  cellPhoneOfplataform: string;
  emailOfplataform: string;

  bank: string;
  agency: string;
  account: string;

  client:[
    {
      FOREIGN_KEY_INVOICE: string;
      date: string;
      name: string;
      price: number;
    }
  ]
}