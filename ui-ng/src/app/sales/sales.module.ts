import { NgModule } from '@angular/core';
import { OrderComponent } from './order/order.component';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { CompanyModule } from '../company/company.module';
import { ContactService } from '../company/contact/contact.service';
import { ProductService } from '../db/product.service';
import { OrderModule } from '../order/order.module';
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
    imports: [
        AppCommonModule,
        SalesRoutingModule,
        CompanyModule,
        OrderModule
    ],
    providers: [
        ContactService,
        ProductService,
    ],
    declarations: [OrderComponent, SalesComponent],
})
export class SalesModule { }
