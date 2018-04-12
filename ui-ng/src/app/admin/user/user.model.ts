export enum Group {
    ADMIN       = 0b1 << 0,
    SALES       = 0b1 << 1,
    PURCHASING  = 0b1 << 2,
    INVENTORY   = 0b1 << 3,
    ACCOUNTING  = 0b1 << 4,
    MANAGEMENT  = 0b1 << 5,
    // insert here
}

export class User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    groups: number;

    constructor(o: { id: string, name: string, firstName: string, lastName: string, groups: number }) {
        this.id = o.id;
        this.name = o.name;
        this.firstName = o.firstName;
        this.lastName = o.lastName;
        this.groups = o.groups;
    }

    public belongsTo(g: Group): boolean {
        return (this.groups & g) === g;
    }
}
