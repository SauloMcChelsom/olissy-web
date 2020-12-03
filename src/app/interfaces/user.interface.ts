export interface UserInterface {
  timestamp       :string;
  PRIMARY_KEY     : number;
  FOREIGN_KEY_UID : string;
  password        : string;
  retypePassword  : string;
  name            : string;
  terms           : boolean;
  type            : number;
  email           : string;
	primary_key     : number;
	foreign_key_uid : string;
	retype_password : string;
}