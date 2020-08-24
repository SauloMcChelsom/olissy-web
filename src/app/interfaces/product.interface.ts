export interface ProductInterface {
  AUTOINCREMENT: any;
  DATE: string;
  PRIMARY_KEY: string;
  FOREIGN_KEY_USER: string;
  FOREIGN_KEY_WAREHOUSE: string;
  FOREIGN_KEY_STORE: string;
  price: string;
  productForSale: boolean;
  quantities: number;
  totalOfLove: number;
  totalOfSale: number;
  totalOfComment: number;
} 