export interface ConversationInterface {
  AUTOINCREMENT: Date;
  DATE: Date;
  PRIMARY_KEY: string;
  COMPOSITE_KEY_OF_MY_FRIEND: string;

  PRIMARY:{
    FOREIGN_KEY_USER:string,
    name:string,
    photo:string,
    view:boolean,
  }

  SECONDARY:{
    FOREIGN_KEY_USER:string,
    name:string,
    photo:string,
    view:boolean,
  }

  message: [
    {
      FOREIGN_KEY_USER: string;
      date: string;
      name: string;
      photo: string;
      text: string;
      view: boolean;
    }
  ]
}
