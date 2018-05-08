import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    dataSource: Object[] = [
        {
            number: 1,
            product: 'asdfasdfasdfds',
            quantity: 1,
            price: 1,
        },
        {
            number: 1,
            product: 'asdfasdfasdfds',
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
