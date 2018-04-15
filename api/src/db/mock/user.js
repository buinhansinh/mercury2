const Group = require('./group')

const USERS = [
    {
        // id: '1',
        name: 'sales',
        firstName: 'John',
        lastName: 'Sales',
        groups: Group.SALES,
        salt: 'salt',
        password: 'sales',
    },
    {
        // id: '2',
        name: 'purchasing',
        firstName: 'John',
        lastName: 'Purchasing',
        groups: Group.PURCHASING,
        salt: 'salt',
        password: 'purchasing',
    },
    {
        // id: '3',
        name: 'inventory',
        firstName: 'John',
        lastName: 'Inventory',
        groups: Group.INVENTORY,
        salt: 'salt',
        password: 'inventory',
    },
    {
        // id: '4',
        name: 'accounting',
        firstName: 'John',
        lastName: 'Accounting',
        groups: Group.ACCOUNTING,
        salt: 'salt',
        password: 'accounting',
    },
    {
        // id: '5',
        name: 'management',
        firstName: 'John',
        lastName: 'Management',
        groups: Group.MANAGEMENT,
        salt: 'salt',
        password: 'management',
    },
    {
        // id: '6',
        name: 'admin',
        firstName: 'John',
        lastName: 'Admin',
        groups: Group.ADMIN,
        salt: 'salt',
        password: 'admin',
    },
];

module.exports = USERS