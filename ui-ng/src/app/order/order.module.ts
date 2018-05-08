import { NgModule } from '@angular/core';
import {
    OrderProductComponent,
    OrderProductPricingInfoComponent,
    OrderProductStockInfoComponent
} from './order-product/order-product.component';
import { InventoryService } from '../db/inventory.service';
import { OrderService } from '../db/order.service';
import { OrderServiceComponent } from './order-service/order-service.component';
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
    imports: [
        AppCommonModule,
    ],
    declarations: [
        OrderProductComponent,
        OrderProductPricingInfoComponent,
        OrderProductStockInfoComponent,
        OrderServiceComponent
    ],
    providers: [OrderService, InventoryService],
    exports: [
        OrderProductComponent,
    ],
    entryComponents: [
        OrderProductStockInfoComponent,
        OrderProductPricingInfoComponent,
    ]
})
export class OrderModule { }
