import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { OrderPricing } from './order.model';
import { DocumentType } from './document.model';

@Injectable()
export class OrderService {

    constructor() { }

    getPricing(productId: string, contactId: string, doctype: DocumentType): Observable<OrderPricing> {
        return of({
            suggested: 500,
            last: 250,
            low: 200,
            high: 300,
            cost: 175,
        });
    }
}
