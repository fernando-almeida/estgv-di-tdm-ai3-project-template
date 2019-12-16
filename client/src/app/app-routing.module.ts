import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialLayoutComponent } from './material-layout/material-layout.component';
import { HomeComponent } from './Home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import {LogintesteComponent} from './loginteste/loginteste.component'
import{RegistarComponent} from './registar/registar.component'
import{MudarPassComponent} from './mudar-pass/mudar-pass.component'
import{EmailComponent} from './email/email.component'

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule)
  },
  {
    path: '',
    component: HomeComponent,
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
  ,{
    path: 'loginteste',
    component:  LogintesteComponent
  }
  ,{
    path: 'registar',
    component:  RegistarComponent
  }
  ,{
    path: 'mudarpass',
    component: MudarPassComponent
  }
  ,
  {
    path: 'email',
    component: EmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
