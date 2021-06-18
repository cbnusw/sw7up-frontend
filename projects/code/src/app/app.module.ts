import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'shared';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DashboardPageModule } from './pages/dashboard-page/dashboard-page.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule.forRoot({
      authHost: environment.authHost,
      apiHost: environment.apiHost,
      apiVersion: environment.apiVersion,
      uploadHost: environment.uploadHost,
      codeHost: environment.codeHost,
      loginPageUrl: environment.loginPageUrl,
    }),
    DashboardPageModule,
  ],
  providers: [
    // { provide: APP_BASE_HREF, useValue: '/code/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
