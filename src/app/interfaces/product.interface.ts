export interface ProductInterface {
  PRIMARY_KEY?: string;
  FOREIGN_KEY_USER?: string;
  FOREIGN_KEY_WAREHOSE?: string;
  FOREIGN_KEY_STORE?: string;
  productPrice?: string;
  productForSale?: string;
  productDateRegister?: string;
  productQuantities?: number;
  love?: number;
  sale?: number;
  comment?: number;
}