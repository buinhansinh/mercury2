import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { UserFormComponent } from './user-form/user-form.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { LocationsComponent } from './locations/locations.component';
import { ReportsComponent } from './reports/reports.component';
import { GroupModifyComponent } from './group-modify/group-modify.component';
import { UserModifyComponent } from './user-modify/user-modify.component';
import { AuthGuard } from '../guards/auth-guard';
import { GroupResolver } from './group-modify/group.resolve';
import { UserResolver } from './user-modify/user.resolve';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: ManagementComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user',
        component: UserFormComponent
      },
      {
        path: 'user/:id',
        component: UserModifyComponent,
        resolve: {
          data: UserResolver
        }
      },
      {
        path: 'groups',
        component: GroupsComponent
      },
      {
        path: 'group',
        component: GroupFormComponent
      },
      {
        path: 'group/:id',
        component: GroupModifyComponent,
        resolve: {
          data: GroupResolver
        }
      },
      {
        path: 'locations',
        component: LocationsComponent
      },
      {
        path: 'location',
        component: LocationFormComponent
      },
      {
        path: 'location/:id',
        component: LocationFormComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
