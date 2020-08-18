export interface UserInterface {
  AUTOINCREMENT: Date;
  DATE: Date;
  PRIMARY_KEY: string;
  FOREIGN_KEY_UID: string;
  password: string;
  retypePassword: string;
  name: string;
  terms: boolean;
  type: number;
  email: string;
}