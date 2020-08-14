export interface PaymentInterface {
  PRIMARY_KEY?: string;
  FOREIGN_KEY_STORE?: string;
  indexDay?: string;
  statusPayment?: string;
  openPaymentDay?: string;
  closedPaymentDay?: string;
  inPaymentDay?: string;
  receivedPaymentDay?: string;
  latePaymentDay?: string;
  listStore?: any[];
  value?: number;
  openPaymentStore?: string;
  receivedPaymentStore?: string;
  InPaymentStore?: string;
  latePaymentStore?: string;
}