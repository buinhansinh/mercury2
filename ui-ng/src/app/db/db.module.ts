import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferService } from './offer.service';
import { UserService } from './user.service';
import { ContactService } from './contact.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        UserService,
        OfferService,
        ContactService,
    ],
    declarations: []
})
export class DbModule { }
