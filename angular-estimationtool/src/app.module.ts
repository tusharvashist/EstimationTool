import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AllclientComponent } from './pages/allclient/allclient.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authInterceptorProviders } from './shared/services/http.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllclientComponent,   
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    FormsModule,   
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
