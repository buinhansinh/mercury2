import {
    Injectable
} from '@angular/core';
import {
    Observable
,  of } from 'rxjs';
import {
    Product,
    ProductType
} from './product.model';
import {
    PRODUCTS
} from './product.mock';
import { clone } from '../app-common/util';
import { SearchService } from './search.service';


@Injectable()
export class ProductService implements SearchService<Product> {

    private PRODUCTS: Product[] = PRODUCTS;

    product: Product;

    constructor() { }

    getById(id: string): Observable<Product> {
        return of(PRODUCTS.find(p => p.id === id));
    }

    private product_matches(product: Product, term: string): boolean {
        const lterm = term.toLowerCase();
        if (lterm.length > 1) {
            return (
                product.brand.toLowerCase().indexOf(lterm) >= 0 ||
                product.category.toLowerCase().indexOf(lterm) >= 0 ||
                product.model.toLowerCase().indexOf(lterm) >= 0 ||
                product.specs.toLowerCase().indexOf(lterm) >= 0
            );
        } else {
            return (
                product.brand.toLowerCase().indexOf(lterm) === 0 ||
                product.category.toLowerCase().indexOf(lterm) === 0 ||
                product.model.toLowerCase().indexOf(lterm) === 0
            );
        }
    }

    search(terms: string): Observable<Product[]> {
        console.log(terms);
        if (terms.trim().length < 1) {
            return of([]);
        }
        const results: Product[] = this.PRODUCTS.filter(product =>
            terms.split(' ').every((term: string): boolean =>
                this.product_matches(product, term)));
        return of(results.length > 0 ? clone(results) : null);
    }
}
