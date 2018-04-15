const Group = require('./group')

const USERS = [
    {
        // id: '1',
        name: 'sales',
        display_name: 'Sales',
        groups: Group.SALES,
        salt: 'salt',
        password: 'sales',
    },
    {
        // id: '2',
        name: 'purchasing',
        display_name: 'Purchasing',
        groups: Group.PURCHASING,
        salt: 'salt',
        password: 'purchasing',
    },
    {
        // id: '3',
        name: 'inventory',
        display_name: 'Inventory',
        groups: Group.INVENTORY,
        salt: 'salt',
        password: 'inventory',
    },
    {
        // id: '4',
        name: 'accounting',
        display_name: 'Accounting',
        groups: Group.ACCOUNTING,
        salt: 'salt',
        password: 'accounting',
    },
    {
        // id: '5',
        name: 'management',
        display_name: 'Management',
        groups: Group.MANAGEMENT,
        salt: 'salt',
        password: 'management',
    },
    {
        // id: '6',
        name: 'admin',
        display_name: 'Admin',
        groups: Group.ADMIN,
        salt: 'salt',
        password: 'admin',
    },
];

module.exports = USERS