export enum OfferType {
  PRODUCT = 0,
  SERVICE = 1
}

export interface Offer {
  id: string;
  type: OfferType;
  properties: Object;
  description: string;
}

export const EMPTY_PRODUCT: Offer = {
  id: null,
  type: OfferType.PRODUCT,
  properties: {
    brand: null,
    model: null,
    specifications: null
  },
  description: null
};

export const EMPTY_SERVICE: Offer = {
  id: null,
  type: OfferType.SERVICE,
  properties: {
    description: null
  },
  description: null
};
