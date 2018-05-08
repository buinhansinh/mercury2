import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        UserService,
        ProductService
    ],
    declarations: []
})
export class DbModule { }
