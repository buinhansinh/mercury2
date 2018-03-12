import {
    BrowserAnimationsModule,
    NoopAnimationsModule
} from "@angular/platform-browser/animations";
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
} from "@angular/material";
import {
    BrowserModule
} from "@angular/platform-browser";
import {
    NgModule
} from "@angular/core";
import {
    AppComponent
} from "./app.component";
import {
    AppRoutingModule
} from "./app-routing.module";
import {
    AdminModule
} from "./admin/admin.module";
import {
    PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
    DashboardComponent
} from "./dashboard/dashboard.component";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        PageNotFoundComponent
    ],
    imports: [
        AdminModule,
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}