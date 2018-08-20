import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminModule } from './admin/admin.module';
import { AppCommonModule } from './app-common/app-common.module';
import { SalesModule } from './sales/sales.module';
import { DbModule } from './db/db.module';
import { CompanyModule } from './company/company.module';
import { InventoryModule } from './inventory/inventory.module';
import { AccountingModule } from './accounting/accounting.module';
import { ManagementModule } from './management/management.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    AppCommonModule,
    DbModule,
    CompanyModule,
    SalesModule,
    InventoryModule,
    AccountingModule,
    ManagementModule,
    AdminModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
