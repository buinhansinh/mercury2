export enum Group {
    ADMIN       = 0b1 << 0,
    SALES       = 0b1 << 1,
    PURCHASING  = 0b1 << 2,
    INVENTORY   = 0b1 << 3,
    ACCOUNTING  = 0b1 << 4,
    MANAGEMENT  = 0b1 << 5,
    // insert here
}

export interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    groups: number;
}

export function userBelongsTo(user: User, group: Group): boolean {
    return (user.groups & group) === group;
}
