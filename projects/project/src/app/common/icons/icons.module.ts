import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Components } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [...Components],
  exports: [...Components],
})
export class IconsModule {}
