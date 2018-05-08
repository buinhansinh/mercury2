import {
    NgModule
} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    SalesComponent
} from './sales.component';
import {
    OrderComponent
} from './order/order.component';

const routes: Routes = [{
    path: 'sales',
    component: SalesComponent,
    children: [
        {
            path: 'order',
            component: OrderComponent,
        },
        {
            path: 'order/:id',
            component: OrderComponent,
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SalesRoutingModule { }
