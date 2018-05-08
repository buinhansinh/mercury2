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

