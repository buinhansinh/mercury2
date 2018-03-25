import {
    BrowserAnimationsModule,
    NoopAnimationsModule
} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatButton,
    MatCardModule,
    MatFormFieldModule,
} from '@angular/material';
import {
    BrowserModule
} from '@angular/platform-browser';
import {
    NgModule
} from '@angular/core';
import {
    AppComponent
} from './app.component';
import {
    AppRoutingModule
} from './app-routing.module';
import {
    PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
    LoginComponent
} from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        PageNotFoundComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatToolbarModule,
        MatIconModule,
        MatInputModule,
        MatSidenavModule,
        MatExpansionModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
