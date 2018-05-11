import { Product } from './product.model';

export interface OrderProduct {
    product_id: string;
    quantity: number;
    price: number;
}

export interface OrderService {
    service_id: string;
    quantity: number;
    price: number;
}

export interface OrderPricing {
    suggested: number;
    last: number;
    low: number;
    high: number;
    cost: number;
}

export enum OrderStatus {
    PLACED = 0,
    FULFILLED,
    CANCELED,
}

export enum InventoryDocumentStatus {
    PLACED = 0,
    CANCELED,
}

export interface Document {
    id: string;
    date: Date;
    status: number;
    processed: boolean;
    parent: string;
}
