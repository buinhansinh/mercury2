import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { AuthGuard } from './guards/auth-guard';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';
import { NotificationDisplayerComponent } from './notification-displayer/notification-displayer.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    LoginComponent,
    LayoutWrapperComponent,
    NotificationDisplayerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppCommonModule.forRoot(),
    DbModule.forRoot(),
    AppRoutingModule
  ],
  exports: [],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
