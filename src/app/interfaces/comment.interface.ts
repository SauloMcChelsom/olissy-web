export interface CommentInterface {
  AUTOINCREMENT: Date;
  DATE: Date;
  PRIMARY_KEY: string;
  FOREIGN_KEY_USER: string;
  FOREIGN_KEY_PRODUCT: string;
  FOREIGN_KEY_STORE: string;
  text: string;
  imageIconUrl: string;
  name: string;
  view: boolean;
}