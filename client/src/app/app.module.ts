import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { ApiModule } from './api_client/api.module';
import { Configuration, ConfigurationParameters } from './api_client/configuration';
import { BASE_PATH } from './api_client/variable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MaterialLayoutComponent } from './material-layout/material-layout.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {HomeComponent} from './Home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {LogintesteComponent} from './loginteste/loginteste.component';
import {RegistarComponent} from './registar/registar.component';
import {MudarPassComponent} from './mudar-pass/mudar-pass.component';
import {EmailComponent} from './email/email.component';
import {ApoioComponent} from './apoio/apoio.component';
import { ExternalApiComponent } from './external-api/external-api.component';
import { PushNotificationService } from 'ngx-push-notifications';
import { UtilizadoresComponent } from './utilizadores/utilizadores.component';
import { ServiceWorkerModule } from '@angular/service-worker';


/**
 * Build API configuration
 */

@NgModule({
  declarations: [
    AppComponent,
    MaterialLayoutComponent,
    NavBarComponent,
    HomeComponent,
    LoginFormComponent,
    ProfileComponent,
    LogintesteComponent,
    RegistarComponent,
    MudarPassComponent,
    EmailComponent,
    ExternalApiComponent,
    ApoioComponent,
    UtilizadoresComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    // Hard-coded on API *Service classes but can be overriden here
    { provide: BASE_PATH, useValue: environment.apiBaseUrl },
    PushNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }