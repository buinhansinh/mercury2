import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Pricing } from './order.model';

@Injectable()
export class OrderService {

    constructor() { }

    getPricing(productId: string, contactId: string, doctype: DocumentType): Observable<Pricing> {
        return of({
            suggested: 500,
            last: 250,
            low: 200,
            high: 300,
            cost: 175,
        });
    }
}
