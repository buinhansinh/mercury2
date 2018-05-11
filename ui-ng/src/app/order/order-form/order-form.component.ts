import { Component, OnInit } from '@angular/core';
import { OrderProduct } from '../../db/order.model';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

    products: OrderProduct[] = [
        {
            product_id: '1',
            quantity: 1,
            price: 1,
        },
        {
            product_id: '2',
            quantity: 1,
            price: 1,
        }
    ];

    filteredStates = [{
        name: 'asdfasdf',
        population: 2,
    }, {
        name: 'asdfsdf',
        population: 3,
    }];

    displayedColumns = ['product', 'quantity', 'price', 'total', 'remove'];

    constructor() { }

    ngOnInit() {
    }

}
