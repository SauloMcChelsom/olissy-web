export interface category {
  [categories: number]: {
    category?: string;
    categoryImagePath?: string;
    categoryImageUrl?: string;
    categoryQuantities?: number;
  };
}

export interface client {
  FOREIGN_KEY?: string;
  PRIMARY_KEY?: string;
  clientNeighborhood?: string;
  clientCellPhone?: string;
  clientCity?: string;
  clientEmail?: string;
  clientImagePath?: string;
  clientImageUrl?: string;
  clientBirth?: string;
  clientName?: string;
  clientStreet?: string;
  clientSex?: string;
  clientLastName?: string;
  clientTelephone?: string;
  clientCEP?: string;
  clientState?: string;
}

export interface comment {
  PRIMARY_KEY_CLIENT?: string;
  PRIMARY_KEY_PRODUCT?: string;
  comment?: string;
  commentDate?: string;
  commentImageUrl?: string;
  commenterName?: string;
}

export interface store {
  FOREIGN_KEY?: string;
  PRIMARY_KEY?: string;
  productQuantity:number,
  storeAbout?: string;
  storeCategory?: string;
  storeDeliveryEstimate?: string;
  storeHours?: string;
  storeImagePath?: string;
  storeImageUrl?: string;
  storeName?: string;
  storeRating?: number;
  follow?: number;
  storeCity?: string;
  storeNeighborhood?: string;
  storeStreet?: string;
  storeCellPhone?: string;
  storeEmail?: string;
  storeTelephone?: string;
}

export interface punctuation {
  PRIMARY_KEY?: string;
  PRIMARY_KEY_PRODUCT?: string;
  love?: number;
  follow?: number;
  sale?: number;
  view?: number;
}

export interface product {
  FOREIGN_KEY?: string;
  PRIMARY_KEY?: string;
  productCategory?: string;
  [store: number]: {
    storeImagePath;
    storeName;
    storeRating;
  };
  productDescription?: string;
  productForSale?: string;
  productImageUrl?: string;
  productImagePath?: string;
  productName?: string;
  productPrice?: number;
  productRating?: number;
}

export interface reactions {
  PRIMARY_KEY_CLIENT?: string;
  PRIMARY_KEY_PRODUCT?: string;
  PRIMARY_KEY?: string;
  clientReactionsLove: boolean;
  clientReactionsFollow: boolean;
  clientReactionsView: boolean;
}

export interface review {
  PRIMARY_KEY_CLIENT?: string;
  PRIMARY_KEY_STORE?: string;
  reviewComment?: string;
  reviewDate?: string;
  userNameFull?: string;
  userImageUrl?: string;
  reviewRating?: number;
}

export interface user {
  FOREIGN_KEY?: string;
  PRIMARY_KEY?: string;
  userEmail?: string;
  userName?: string;
  userTerms?: boolean;
  userType?: number;
}

export interface order {
  PRIMARY_KEY?: string;
  FOREIGN_KEY?: string;
  orderDate?: string;
  orderState?: string;
  storeViewedTheOrder?: boolean;
  clientAddressFull?: string;
  clientCellPhone?: string;
  clientMethodPayment?: string;
  totalOrderValue?: number;
  clientImageUrl?: string;
  product: [
    {
      FOREIGN_KEY?: string;
      PRIMARY_KEY?: string;
      productCategory?: string;
      productDateRegister?: string;
      productDescription?: string;
      productForSale?: string;
      productImagePath?: string;
      productImageUrl?: string;
      productName?: string;
      productPrice?: string;
      productPriceOrigin?: string;
      quantities?: any;
    }
  ];
  message: [
    {
      FOREIGN_KEY?: string;
      clientImageUrl?: string;
      clientName?: string;
      clientLastName?: string;
      message?: string;
      messageViewed: any;
      messageDate?: string;
    }
  ];
  client: {
    FOREIGN_KEY_CLIENT?: string;
    clientImageUrl?: string;
    clientNameFull?: string;
  };
}

export interface message {
  FOREIGN_KEY?: string;
  imageUrl?: string;
  nameFull?: string;
  message?: string;
  messageViewed?: string;
  messageDate?: string;
}
