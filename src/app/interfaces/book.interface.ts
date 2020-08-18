export interface BookInterface {
 AUTOINCREMENT: Date;
  /**
  * Descrição:
  * exemplo:
  */

  DATE: Date;
  /**
  * Descrição:
  * exemplo:
  */

  PRIMARY_KEY: string;
  /**
  * Descrição:
  * exemplo:
  */

  statusPayment: string;
  /**
  * Descrição:
  * exemplo:
  */
  
  openPaymentDay: string;
  /**
  * Descrição:
  * exemplo:
  */
  
  closedPaymentDay: string;
  /**
  * Descrição:
  * exemplo:
  */
  
  inPaymentDay: string;
  /**
  * Descrição:
  * exemplo:
  */
  
  receivedPaymentDay: string;
  /**
  * Descrição:
  * exemplo:
  */
  
  latePaymentDay: string;
  /**
  * Descrição:
  * exemplo:
  */
  
  listStore:[
    {
      FOREIGN_KEY_STORE: string,
      FOREIGN_KEY_PAYMENT: string,
    }
  ];
  

  totalValueOfAllStore: number;
  /**
  * Descrição:
  * exemplo:
  */
  
  openPaymentStore: number;
  /**
  * Descrição:
  * exemplo:
  */
  
  receivedPaymentStore: number;
  /**
  * Descrição:
  * exemplo:
  */
  
  InPaymentStore: number;
  /**
  * Descrição:
  * exemplo:
  */
  
  latePaymentStore: number;
  /**
  * Descrição:
  * exemplo:
  */
  
}