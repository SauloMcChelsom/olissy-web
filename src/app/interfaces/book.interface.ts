export interface BookInterface {
  AUTOINCREMENT: any;
  DATE: string;
  PRIMARY_KEY: string;
  statusPayment: string;
  openPaymentDay: string;
  closedPaymentDay: string;
  inPaymentDay: string;
  receivedPaymentDay: string;
  latePaymentDay: string;
  totalValueOfAllStore: number;
  openPaymentStore: number;
  receivedPaymentStore: number;
  InPaymentStore: number;
  latePaymentStore: number;
  listStore:[
    {
      FOREIGN_KEY_STORE: string,
      FOREIGN_KEY_PAYMENT: string,
    }
  ];
}