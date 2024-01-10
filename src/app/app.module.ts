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
