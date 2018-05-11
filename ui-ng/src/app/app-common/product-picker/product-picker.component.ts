import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { Product } from '../../db/product.model';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { ProductService } from '../../db/product.service';

@Component({
    selector: 'app-product-picker',
    templateUrl: './product-picker.component.html',
    styleUrls: ['./product-picker.component.css']
})
export class ProductPickerComponent implements OnInit {

    @Output() productPicked = new EventEmitter<Product>();

    products$: Observable<Product[]>;
    product: Product;
    searchInput: FormControl;

    constructor(private productService: ProductService) {
        this.searchInput = new FormControl();
        this.products$ = this.searchInput.valueChanges
            .pipe(
                debounceTime(300), // wait 300ms after each keystroke before considering the term
                distinctUntilChanged(), // ignore new term if same as previous term
                switchMap((terms: string | Product) => this.onSearch(terms)), // switch to new search observable each time the term changes
        );
    }

    ngOnInit() {
    }

    onSearch(terms: string | Product): Observable<Product[]> {
        return (typeof terms === 'string') ? this.productService.search(<string>terms) : of([]);
    }

    onSelect() {
        this.product = this.searchInput.value;
        this.productPicked.emit(this.searchInput.value); // we're getting a product from autocomplete
    }

    reset() {
        this.searchInput.setValue(this.product);
    }

    productDesc(product) {
        return product ?
            `${product.brand} ${product.category} ${product.model} ${product.specs}` : null;
    }
}
