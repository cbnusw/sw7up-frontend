import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { ControlsModule } from '../../common/controls';
import { MainModule } from '../../common/main/main.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { Components, Pipes } from './index';


@NgModule({
  declarations: [
    ...Components,
    ...Pipes,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ControlsModule,
    MainModule,
    StatisticsModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...Components,
    ...Pipes,
  ]
})
export class ProjectModule {
}
