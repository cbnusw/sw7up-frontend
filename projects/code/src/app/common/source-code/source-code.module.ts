import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesModule } from '../utilities/utilities.module';
import { SourceListComponent } from './source-list/source-list.component';



@NgModule({
  declarations: [
    SourceListComponent
  ],
  imports: [
    CommonModule,
    UtilitiesModule
  ],
  exports: [
    SourceListComponent
  ]
})
export class SourceCodeModule { }
