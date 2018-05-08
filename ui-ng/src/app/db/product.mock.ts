import {
    Product,
    ProductType
} from './product.model';

export const PRODUCTS: Product[] = [
    {
        id: '1',
        type: ProductType.INVENTORY,
        brand: 'FUJI',
        category: 'BREAKER',
        model: 'EA103B',
        specs: '100A',
    },
    {
        id: '2',
        type: ProductType.INVENTORY,
        brand: 'FUJI',
        category: 'CONTACTOR',
        model: 'SC-01',
        specs: '220V',
    },
    {
        id: '3',
        type: ProductType.INVENTORY,
        brand: 'TECO',
        category: 'BREAKER',
        model: 'TO-50E',
        specs: '50A',
    },
    {
        id: '4',
        type: ProductType.INVENTORY,
        brand: 'TECO',
        category: 'CONTACTOR',
        model: 'CU-11',
        specs: '220V',
    },
    {
        id: '5',
        type: ProductType.INVENTORY,
        brand: 'TECO',
        category: 'CONTACTOR',
        model: 'CU-22',
        specs: '220V',
    },
    {
        id: '6',
        type: ProductType.NON_INVENTORY,
        brand: 'GENERIC',
        category: 'PANEL',
        model: 'CUSTOM',
        specs: '24x24x24',
    },
    {
        id: '7',
        type: ProductType.NON_INVENTORY,
        brand: 'GENERIC',
        category: 'PANEL',
        model: 'CUSTOM',
        specs: '16x24x32',
    },
];
