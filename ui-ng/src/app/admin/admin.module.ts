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
    HttpClientModule
} from '@angular/common/http';
import {
    FormsModule
} from '@angular/forms';
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
    ErrorStateMatcher,
    ShowOnDirtyErrorStateMatcher,
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
    AdminComponent
} from './admin.component';
import {
    UserService
} from './user/user.service';
import {
    UserComponent
} from './user/user.component';
import {
    UsernameExistsDirective
} from './user/username-exists.directive';

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
        HttpClientModule,
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
        { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
    ],
    declarations: [AdminComponent, UserComponent, UsernameExistsDirective]
})
export class AdminModule { }
