import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartModule, LineChartModule } from '@swimlane/ngx-charts';
import { Components, LineChartComponent } from './components';
import { SiPrefixPipe } from './pipes/si-prefix.pipe';

@NgModule({
  declarations: [
    ...Components,
    SiPrefixPipe,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    BarChartModule,
    LineChartModule
  ],
  providers: [
    DecimalPipe,
  ],
  exports: [
    ...Components,
    SiPrefixPipe,
  ]
})
export class StatisticsModule {
}
