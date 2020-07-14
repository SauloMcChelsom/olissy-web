  export interface BookInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_PAYMENT: string;
  }

  export interface ClientInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_USER: string;
    neighborhood: string;
    cellPhone: string;
    city: string;
    email: string;
    imagePath: string;
    tmageUrl:string;
    birth: string;
    name: string;
    street: string;
    sex: string;
    lastName: string;
    telephone: string;
  }

  export interface CommentInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_USER: string;
    FOREIGN_KEY_PRODUCT: string;
    FOREIGN_KEY_STORE: string;
  }

  export interface CompanyInterface {
    company: string;
  }

  export interface ContactInterface {
    PRIMARY_KEY: string;
    MY_FOREIGN_KEY_USER: string;
    FRIEND_FOREIGN_KEY_USER: string;
    COMPOSITE_KEY_OF_MY_FRIEND: string;
  }

  export interface ConversationInterface {
    PRIMARY_KEY: string;
    COMPOSITE_KEY_OF_MY_FRIEND: string;
  }

  export interface IncrementInterface {
    store: number;
    product: number;
    user: number;
  }

  export interface InvoiceInterface{
    PRIMARY_KEY: string;
    FOREIGN_KEY_CLIENT: string;
    FOREIGN_KEY_STORE: string;
  }

  export interface OrderInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_CLIENT: string;
    FOREIGN_KEY_STORE: string;
  }

  export interface PaymentInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_STORE: string;
  }

  export interface ProductInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_USER: string;
    FOREIGN_KEY_WAREHOSE: string;
    FOREIGN_KEY_STORE: string;
  }

  export interface ReactInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_USER: string;
  }

  export interface StoreInterface {
    PRIMARY_KEY: string;
    FOREIGN_KEY_USER: string;
    productQuantity: number;
    storeAbout: string;
    storeCategory: string;
    storeDeliveryEstimate: string;
    storeHours: string;
    storeImagePath: string;
    storeImageUrl: string;
    storeName: string;
    storeRating: number;
    follow: number;
    storeCity: string;
    storeNeighborhood: string;
    storeStreet: string;
    storeCellPhone: string;
    storeEmail: string;
    storeTelephone: string;
  }

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

  export interface WarehoseInterface {
    PRIMARY_KEY: string;
  }
    
  