import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    RouterModule,
    Routes
} from '@angular/router';
import {
    AdminComponent
} from './admin.component';
import {
    UserComponent
} from './user/user.component';
import { FormsModule } from '@angular/forms';
import {
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButton,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    UserService
} from './user/user.service';

const routes: Routes = [{
    path: '',
    component: AdminComponent,
    children: [{
        path: 'user/:id',
        component: UserComponent,
    },
    ]
}];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        MatSidenavModule,
        MatExpansionModule,
        MatIconModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
    ],
    providers: [
        UserService,
    ],
    declarations: [AdminComponent, UserComponent]
})
export class AdminModule { }
