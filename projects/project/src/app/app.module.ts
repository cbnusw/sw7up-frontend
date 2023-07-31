import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'shared';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsModule } from './common/controls';
import { MainModule } from './common/main/main.module';
import { ProjectModule } from './features/project';
import { StatisticsModule } from './features/statistics/statistics.module';
import { DashboardChartComponent, DashboardPageComponent } from './pages/dashboard-page';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels, ...registerables);

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    DashboardChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    SharedModule.forRoot({
      authHost: environment.authHost,
      apiHost: environment.apiHost,
      apiVersion: environment.apiVersion,
      uploadHost: environment.uploadHost,
      codeHost: environment.codeHost,
      loginPageUrl: environment.host + '/account/login',
    }),
    ProjectModule,
    StatisticsModule,
    ControlsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
