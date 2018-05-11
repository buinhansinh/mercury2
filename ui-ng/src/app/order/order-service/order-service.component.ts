import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../../db/product.model';
import { OrderPricing, OrderProduct } from '../../db/order.model';
import { OrderService } from '../../db/order.service';
import { InventoryService } from '../../db/inventory.service';
import { Observable ,  of } from 'rxjs';
import { Stock } from '../../db/inventory.model';
import { DocumentType } from '../../db/document.model';
import { debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { ProductService } from '../../db/product.service';
import { OrderPricingInfoComponent } from '../order-pricing-info/order-pricing-info.component';
import { OrderStockInfoComponent } from '../order-stock-info/order-stock-info.component';

@Component({
  selector: 'app-order-service',
  templateUrl: './order-service.component.html',
  styleUrls: ['./order-service.component.css']
})
export class OrderServiceComponent implements OnInit {

    @Input() contactId: string;
    @Input() docType: DocumentType;
    @Input() order: OrderProduct;

    // form
    form: FormGroup;
    quantityInput: FormControl;
    priceInput: FormControl;
    serviceInput: FormControl;
    totalInput: FormControl;
    snackbarRef: any;

    // data
    product: Product;
    quantity: number;
    price: number;

    // autocomplete observables
    products$: Observable<Product[]>;
    pricing$: Observable<OrderPricing>;
    stocks$: Observable<Stock[]>;

    constructor(private snackbar: MatSnackBar,
        private productService: ProductService,
        private orderService: OrderService,
        private inventoryService: InventoryService) {

        this.serviceInput = new FormControl();
        this.quantityInput = new FormControl();
        this.priceInput = new FormControl();
        this.totalInput = new FormControl();
        this.form = new FormGroup({
            serviceInput: this.serviceInput,
            quantityInput: this.quantityInput,
            priceInput: this.priceInput,
            totalInput: this.totalInput,
        });

        this.products$ = this.serviceInput.valueChanges
            .pipe(
                // wait 300ms after each keystroke before considering the term
                debounceTime(300),
                // ignore new term if same as previous term
                distinctUntilChanged(),
                // switch to new search observable each time the term changes
                switchMap((terms: string | Product) => this.productSearch(terms)),
        );

        this.quantityInput.valueChanges.subscribe(value => this.totalInput.setValue(value * this.priceInput.value));
        this.priceInput.valueChanges.subscribe(value => this.totalInput.setValue(value * this.quantityInput.value));
    }

    ngOnInit() {
        this.productService.getById(this.order.product_id).subscribe(p => {
            console.log(this.order);
            this.serviceInput.setValue(p);
            this.productSelect();
            this.quantityInput.setValue(this.order.quantity);
            this.priceInput.setValue(this.order.price);
        });
    }

    productSearch(terms: string | Product): Observable<Product[]> {
        switch (typeof terms) {
            case 'string':
                return this.productService.search(<string>terms);
            default:
                this.serviceInput.setValue(terms);
                return of([]);
        }
        // return (typeof terms === 'string') ? this.productService.search(<string>terms) : of([]);
    }

    productSelect() {
        this.product = this.serviceInput.value;
        this.pricing$ = this.orderService.getPricing(this.product.id, this.contactId, this.docType);
        this.stocks$ = this.inventoryService.getStock(this.product.id);
        // this.quantityInput.enable();
        // this.priceInput.enable();
    }

    productReset() {
        this.serviceInput.setValue(this.product);
    }

    productDisplay(product) {
        return product ?
            `${product.brand} ${product.category} ${product.model} ${product.specs}` : null;
    }

    showSnackBar(type) {
        if (this.snackbarRef) {
            this.hideSnackBar();
        }

        const snackbars = {
            stocks: {
                component: OrderStockInfoComponent,
                data: this.stocks$,
            },
            pricing: {
                component: OrderPricingInfoComponent,
                data: this.pricing$,
            }
        };

        this.snackbarRef = this.snackbar.openFromComponent(snackbars[type].component, {
            data: snackbars[type].data,
        });
    }

    hideSnackBar() {
        this.snackbarRef.dismiss();
        this.snackbarRef = null;
    }

}
