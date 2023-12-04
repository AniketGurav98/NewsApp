import { NgModule } from '@angular/core';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailArticleComponent,
    NavbarComponent,
    PrimaryUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
