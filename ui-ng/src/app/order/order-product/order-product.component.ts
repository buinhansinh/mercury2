import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from '../../db/product.model';
import { Pricing } from '../../db/order.model';
import { OrderService } from '../../db/order.service';
import { InventoryService } from '../../db/inventory.service';
import { Observable } from 'rxjs/Observable';
import { Stock } from '../../db/inventory.model';


@Component({
    selector: 'app-order-product',
    templateUrl: './order-product.component.html',
    styleUrls: ['./order-product.component.css']
})
export class OrderProductComponent implements OnInit {

    @Input() contactId;
    @Input() docType;

    form: FormGroup;
    qtyInput: FormControl;
    priceInput: FormControl;
    priceSnackBar: any;

    product: Product;
    quantity: number;
    price: number;

    pricing$: Observable<Pricing>;
    stocks$: Observable<Stock[]>;

    constructor(private snackbar: MatSnackBar,
        private orderService: OrderService,
        private inventoryService: InventoryService) {
        this.product = null;
        this.qtyInput = new FormControl({ value: '', disabled: true });
        this.priceInput = new FormControl({ value: '', disabled: true });
        this.form = new FormGroup({
            qtyInput: this.qtyInput,
            priceInput: this.priceInput,
        });
    }

    ngOnInit() {
    }

    onQtyFocus() {
        this.priceSnackBar = this.snackbar.openFromComponent(OrderProductStockInfoComponent, {
            data: this.stocks$,
        });
    }

    onQtyBlur() {
        this.priceSnackBar.dismiss();
    }

    onPriceFocus() {
        console.log('focus');
        this.priceSnackBar = this.snackbar.openFromComponent(OrderProductPricingInfoComponent, {
            data: this.pricing$,
        });
    }

    onPriceBlur() {
        this.priceSnackBar.dismiss();
    }

    onProductPicked(p: Product) {
        this.product = p;
        this.pricing$ = this.orderService.getPricing(this.product.id, this.contactId, this.docType);
        this.stocks$ = this.inventoryService.getStock(this.product.id);
        this.qtyInput.enable();
        this.priceInput.enable();
    }
}


@Component({
    selector: 'app-order-product-pricing-info',
    templateUrl: 'order-product-pricing-info.component.html',
    styleUrls: [`order-product.component.css`],
})
export class OrderProductPricingInfoComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public pricing$: Observable<Pricing>) {
    }
}


@Component({
    selector: 'app-order-product-stock-info',
    templateUrl: 'order-product-stock-info.component.html',
    styleUrls: [`order-product.component.css`],
})
export class OrderProductStockInfoComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public stocks$: Observable<Stock[]>) {
    }
}
