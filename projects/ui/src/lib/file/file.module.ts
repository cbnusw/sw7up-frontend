import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileChooserDirective } from './directives/file-chooser.directive';
import { DirectoryChooserDirective } from './directives/directory-chooser.directive';



@NgModule({
  declarations: [
    FileChooserDirective,
    DirectoryChooserDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FileChooserDirective,
    DirectoryChooserDirective
  ]
})
export class FileModule { }
