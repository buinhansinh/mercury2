import {
    User, Group
} from './user.model';

export const USERS = [
    {
        id: '1',
        name: 'sales',
        firstName: 'John',
        lastName: 'Sales',
        groups: [
            Group.SALES,
        ]
    },
    {
        id: '2',
        name: 'purchasing',
        firstName: 'John',
        lastName: 'Purchasing',
        groups: [
            Group.PURCHASING,
        ]
    },
    {
        id: '3',
        name: 'inventory',
        firstName: 'John',
        lastName: 'Inventory',
        groups: [
            Group.INVENTORY,
        ]
    },
    {
        id: '4',
        name: 'accounting',
        firstName: 'John',
        lastName: 'Accounting',
        groups: [
            Group.ACCOUNTING,
        ]
    },
    {
        id: '5',
        name: 'management',
        firstName: 'John',
        lastName: 'Management',
        groups: [
            Group.MANAGEMENT,
        ]
    },
    {
        id: '6',
        name: 'admin',
        firstName: 'John',
        lastName: 'Admin',
        groups: [
            Group.ADMIN,
        ]
    },
];
