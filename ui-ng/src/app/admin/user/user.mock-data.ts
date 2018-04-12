import {
    User, Group
} from './user.model';

export const USERS: User[] = [
    new User({
        id: '1',
        name: 'sales',
        firstName: 'John',
        lastName: 'Sales',
        groups: Group.SALES,
    }),
    new User({
        id: '2',
        name: 'purchasing',
        firstName: 'John',
        lastName: 'Purchasing',
        groups: Group.PURCHASING,
    }),
    new User({
        id: '3',
        name: 'inventory',
        firstName: 'John',
        lastName: 'Inventory',
        groups: Group.INVENTORY,
    }),
    new User({
        id: '4',
        name: 'accounting',
        firstName: 'John',
        lastName: 'Accounting',
        groups: Group.ACCOUNTING,
    }),
    new User({
        id: '5',
        name: 'management',
        firstName: 'John',
        lastName: 'Management',
        groups: Group.MANAGEMENT,
    }),
    new User({
        id: '6',
        name: 'admin',
        firstName: 'John',
        lastName: 'Admin',
        groups: Group.ADMIN,
    }),
];
