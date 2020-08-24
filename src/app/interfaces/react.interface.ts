export interface ReactInterface {
  AUTOINCREMENT: any;
  DATE: string;
  PRIMARY_KEY: string;
  FOREIGN_KEY_USER: string;
  product:[
    {
      FOREIGN_KEY_PRODUCT: string;
      react: boolean;
    }
  ]

  store:[
    {
      FOREIGN_KEY_STORE: string;
      react: boolean;
    }
  ]

}