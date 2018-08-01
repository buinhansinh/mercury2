import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalesComponent } from "./sales.component";
import { SalesOrderComponent } from "./sales-order/sales-order.component";

const routes: Routes = [
  {
    path: "sales",
    component: SalesComponent,
    children: [
      {
        path: "order",
        component: SalesOrderComponent
      },
      {
        path: "order/:id",
        component: SalesOrderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule {}
