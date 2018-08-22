import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { OrderTransferFormComponent } from './order-transfer-form/order-transfer-form.component';
import { LocationTransferFormComponent } from './location-transfer-form/location-transfer-form.component';
import { LocationAdjustmentFormComponent } from './location-adjustment-form/location-adjustment-form.component';
import { AuthGuard } from '../guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: InventoryComponent,
    children: [
      {
        path: 'sales/:id/release',
        component: OrderTransferFormComponent
      },
      {
        path: 'sales/:id/return',
        component: OrderTransferFormComponent
      },
      {
        path: 'purchase/:id/receive',
        component: OrderTransferFormComponent
      },
      {
        path: 'purchase/:id/return',
        component: OrderTransferFormComponent
      },
      {
        path: 'location/transfer',
        component: LocationTransferFormComponent
      },
      {
        path: 'location/adjustment',
        component: LocationAdjustmentFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {}
