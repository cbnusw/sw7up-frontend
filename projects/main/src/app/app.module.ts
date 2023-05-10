import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'shared';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomePageModule } from './pages/home-page/home-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule.forRoot({
      authHost: environment.authHost,
      apiHost: environment.apiHost,
      apiVersion: environment.apiVersion,
      uploadHost: environment.uploadHost,
      codeHost: environment.codeHost,
      loginPageUrl: environment.loginPageUrl,
      baseUrl: environment.baseUrl,
    }),
    HomePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
