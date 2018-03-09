import {
    BrowserAnimationsModule,
    NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}