import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  // nvaigation
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,

  // layout
  MatExpansionModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,

  // buttons
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatBadgeModule,

  // forms
  MatInputModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatSelectModule,

  // popups
  MatSnackBarModule,
  MatDialogModule,
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatDatepickerModule,
  MatTableModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OfferPickerComponent } from './offer-picker/offer-picker.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectOnFocusDirective } from './select-on-focus.directive';
import { ContactPickerComponent } from './contact-picker/contact-picker.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { PageComponent } from '../page/page.component';
import { PageHeaderComponent } from '../page/page-header/page-header.component';
import { PageContentComponent } from '../page/page-content/page-content.component';
import { PageFooterComponent } from '../page/page-footer/page-footer.component';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

const ngModules: any = [CommonModule, FormsModule, ReactiveFormsModule];

const materialModules: any = [
  // navigation
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,

  // layout
  MatExpansionModule,
  MatListModule,
  MatCardModule,
  MatTabsModule,

  // modals
  MatSnackBarModule,
  MatDialogModule,

  // buttons and indicators
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatBadgeModule,

  // forms
  MatCheckboxModule,
  MatInputModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,

  // tables
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
];

const commonComponents: any = [
  ContactPickerComponent,
  OfferPickerComponent,
  SelectOnFocusDirective,
  PageComponent,
  PageHeaderComponent,
  PageContentComponent,
  PageFooterComponent,
  DeleteButtonComponent,
  ConfirmDialogComponent
];

const declarations_ = [].concat(commonComponents);
const imports_ = [].concat(ngModules).concat(materialModules);
const exports_ = []
  .concat(ngModules)
  .concat(materialModules)
  .concat(commonComponents);

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: declarations_,
  imports: imports_,
  exports: exports_,
  entryComponents: [ConfirmDialogComponent]
})
export class AppCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppCommonModule,
      providers: [
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
      ]
    };
  }
}
