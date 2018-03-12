import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    RouterModule,
    Routes
} from "@angular/router";
import {
    AdminComponent
} from './admin.component';
import {
    UserComponent
} from './user/user.component';
import {
    GroupComponent
} from './group/group.component';
import {
  MatSidenavModule,
} from "@angular/material";

const routes: Routes = [{
    path: 'admin',
    component: AdminComponent,
    children: [{
            path: 'users',
            component: UserComponent,
        },
        {
            path: 'groups',
            component: GroupComponent
        }
    ]
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatSidenavModule,
       
    ],
    declarations: [AdminComponent, UserComponent, GroupComponent]
})
export class AdminModule {}