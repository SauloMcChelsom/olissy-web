export interface WarehouseInterface {
  AUTOINCREMENT: Date;
  DATE: Date;
  PRIMARY_KEY: string;
  productImageUrl: string[];
  productImagePath: string[];
  imageNew: string[];
  imageDisplay: string[];
  price: number;
  name: string;
  description: string;
  session: string;
  category: string;
  type: string;
  nameForSearch: string;
  descriptionForSearch: string;
  andGeneric: boolean;
  company: string;
}
