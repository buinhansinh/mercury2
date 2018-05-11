import {
    NgModule, CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import {
    BrowserModule
} from '@angular/platform-browser';

import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import {
    // nvaigation
    MatToolbarModule,
    MatSidenavModule,

    // layout
    MatExpansionModule,
    MatListModule,
    MatCardModule,

    // buttons
    MatIconModule,
    MatButtonModule,

    // forms
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,

    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
    MatDatepickerModule,
    MatTableModule,
    MatNativeDateModule,
    MatSnackBarModule,
} from '@angular/material';
import {
    MatFormFieldModule
} from '@angular/material/form-field';
import {
    ProductPickerComponent,
} from './product-picker/product-picker.component';
import { ServicePickerComponent } from './service-picker/service-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectOnFocusDirective } from './select-on-focus.directive';


const ngModules: any = [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
];

const materialModules: any = [

    // navigation
    MatToolbarModule,
    MatSidenavModule,

    // layout
    MatExpansionModule,
    MatListModule,
    MatCardModule,

    // modals
    MatSnackBarModule,

    // buttons and indicators
    MatIconModule,
    MatButtonModule,

    // forms
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // tables
    MatTableModule,
];

const commonComponents: any = [
    ProductPickerComponent,
    ServicePickerComponent,
    SelectOnFocusDirective,
];

const declarations_ = [].concat(commonComponents);
const imports_ = [].concat(ngModules).concat(materialModules);
const exports_ = [].concat(ngModules).concat(materialModules).concat(commonComponents);

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: declarations_,
    imports: imports_,
    exports: exports_,
    providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ],
})
export class AppCommonModule { }
