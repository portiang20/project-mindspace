import { AlertComponent } from './alert/alert.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';

// App components
import { AppComponent } from './app.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

// Firebase services + environment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './auth/auth/login/login.module';
import { SignupModule } from './auth/auth/signup/signup.module';
import { DjangoTokenInterceptor } from './_helper/django-tk.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    NotfoundComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginModule,
    SignupModule,
  ],
  providers: [
    AuthService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DjangoTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
