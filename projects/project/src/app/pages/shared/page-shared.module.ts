import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ControlsModule } from '../../common/controls';
import { FilterModule } from '../../common/filter/filter.module';
import { MainModule } from '../../common/main/main.module';
import { Components } from './components';
import { Services } from './services';
import { StatsPageComponent } from './stats-page/stats-page.component';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    FilterModule,
    MainModule,
    FormsModule,
    OverlayModule,
    MatDialogModule,
    RouterModule,
  ],
  declarations: [
    StatsPageComponent,
    ...Components
  ],
  providers: [...Services],
  exports: [
    StatsPageComponent,
    ...Components,
  ],
})
export class PageSharedModule {
}
