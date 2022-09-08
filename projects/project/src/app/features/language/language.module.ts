import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../../common/controls';
import { StatisticsModule } from '../statistics/statistics.module';
import { Components, Pipes } from './index';


@NgModule({
  declarations: [
    ...Components,
    ...Pipes,
  ],
  imports: [
    CommonModule,
    ControlsModule,
    StatisticsModule,
    FormsModule
  ],
  exports: [
    ...Components
  ]
})
export class LanguageModule {
}
