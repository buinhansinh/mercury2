import { NgModule } from '@angular/core';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { CompanyModule } from '../company/company.module';
import { OrderModule } from '../order/order.module';
import { AppCommonModule } from '../app-common/app-common.module';
import { SalesOrderComponent } from './sales-order/sales-order.component';

@NgModule({
    imports: [
        AppCommonModule,
        SalesRoutingModule,
        CompanyModule,
        OrderModule
    ],
    providers: [
    ],
    declarations: [SalesComponent, SalesOrderComponent],
})
export class SalesModule { }
