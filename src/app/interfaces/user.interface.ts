export interface UserInterface {
  PRIMARY_KEY?: string;
  FOREIGN_KEY_UID?: string;
  password?: string;
  retypePassword?: string;
  userName?: string;
  userTerms?: boolean;
  userType?: number;
  userEmail?: string;
}