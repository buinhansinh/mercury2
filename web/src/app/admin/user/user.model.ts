export enum Group {
    ADMIN = 1,
    SALES,
    PURCHASING,
    INVENTORY,
    ACCOUNTING,
    MANAGEMENT,
}

export interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    groups: Group[];
}
