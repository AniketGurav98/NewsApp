import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { DetailArticleComponent } from './detail-article/detail-article.component';
import { NavbarComponent } from './navbar/navbar.component';

import { ToastrModule } from 'ngx-toastr';
import { PrimaryUserComponent } from './primary-user/primary-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { GlobalserviceService } from './globalservice.service';
import { ServiceWorkerModule } from '@angular/service-worker';

import { initializeApp } from 'firebase/app';
import { provideFirebaseApp, getApp } from '@angular/fire/app';
import { getMessaging } from '@angular/fire/messaging';

import { environment } from '../environments/environment';

// Initialize Firebase
const firebaseConfig = environment.firebaseConfig;
const app = initializeApp(firebaseConfig);

// Get the messaging instance
const messaging = getMessaging(app);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailArticleComponent,
    NavbarComponent,
    PrimaryUserComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    MatIconModule,
    provideFirebaseApp(() => getApp()),
   
  ],
  providers: [
    GlobalserviceService,
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: GlobalserviceService) => () => appInitializer.initializeFunforUserID(),
      multi: true,
      deps: [GlobalserviceService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
