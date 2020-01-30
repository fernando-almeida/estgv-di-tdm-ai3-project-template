import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { ContactosComponent } from './contactos/contactos.component';
import { RegistarComponent } from './registar/registar.component';
import { EnviarMensagemComponent } from './enviar-mensagem/enviar-mensagem.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

const routes: Routes = [

  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(module => module.UsersModule)
  },
  {
    path: '',
    redirectTo: '', 
    pathMatch: 'full'
  },
  
  {
    path: 'nav-bar',
    component: NavBarComponent
  },

  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'registar',
    component: RegistarComponent
  },

  {
    path: 'contactos',
    component: ContactosComponent
  },

  {
    path: 'enviar-mensagem',
    component: EnviarMensagemComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule,],
  exports: [RouterModule,]
})
export class AppRoutingModule { }
