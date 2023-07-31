import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../controls';
import { Components } from './components';

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    FormsModule,
  ],
  declarations: [...Components],
  exports: [...Components],
})
export class FilterModule {}
