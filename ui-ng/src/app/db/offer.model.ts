export enum OfferType {
    PRODUCT         = 0,
    SERVICE         = 1,
}

export interface Offer {
    id: string;
    type: OfferType;
    description: string;
}
