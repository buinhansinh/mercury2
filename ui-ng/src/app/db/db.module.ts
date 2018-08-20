import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from './offer.service';
import { UserService } from './user.service';
import { ContactService } from './contact.service';
import { GroupService } from './group.service';
import { HttpClientModule } from '@angular/common/http';
import { PermissionService } from './permission.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  imports: [CommonModule, HttpClientModule],

  declarations: []
})
export class DbModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DbModule,
      providers: [
        UserService,
        OfferService,
        ContactService,
        GroupService,
        PermissionService
      ]
    };
  }
}
