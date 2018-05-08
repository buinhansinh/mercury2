export enum ProductType {
    INVENTORY       = 0,
    NON_INVENTORY   = 1,
}

export interface Product {
    id: string;
    type: ProductType;
    brand: string;
    category: string;
    model: string;
    specs: string;
}
