import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialLayoutComponent } from './material-layout/material-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
  ,{
    path: 'profile',
    component: ProfileComponent
  }
  ,{
    path: 'material-layout',
    component:  MaterialLayoutComponent
  }
  ,{
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
