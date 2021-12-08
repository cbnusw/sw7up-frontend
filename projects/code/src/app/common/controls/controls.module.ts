import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'ui';
import { FileSizePipe } from '../utilities/pipes/file-size.pipe';
import { UtilitiesModule } from '../utilities/utilities.module';
import { BannerControlComponent } from './banner-control/banner-control.component';
import { ButtonColorDirective } from './directives/button-color.directive';
import { ButtonSizeDirective } from './directives/button-size.directive';
import { ButtonDirective } from './directives/button.directive';
import { DirectoryChooserDirective } from './directives/directory-chooser.directive';
import { DropFilesDirective } from './directives/drop-files.directive';
import { FileChooserDirective } from './directives/file-chooser.directive';
import { InputDirective } from './directives/input.directive';
import { DocumentControlComponent } from './document-control/document-control.component';
import { OssControlComponent } from './oss-control/oss-control.component';
import { SearchControlComponent } from './search-control/search-control.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { SelectableButtonControlComponent } from './selectable-button-control/selectable-button-control.component';
import { SourceControlComponent } from './source-control/source-control.component';
import { SourceFilesComponent } from './source-control/source-files/source-files.component';
import { SourceUploadComponent } from './source-control/source-upload/source-upload.component';
import { SubjectControlComponent } from './subject-control/subject-control.component';
import { AccountListComponent } from './team-control/account-list/account-list.component';
import { TeamControlComponent } from './team-control/team-control.component';
import { GithubRepoControlComponent } from './github-repo-control/github-repo-control.component';


@NgModule({
  declarations: [
    ButtonDirective,
    ButtonColorDirective,
    ButtonSizeDirective,
    DirectoryChooserDirective,
    DropFilesDirective,
    FileChooserDirective,
    InputDirective,
    SearchControlComponent,
    SelectableButtonControlComponent,
    SelectControlComponent,
    BannerControlComponent,
    SourceControlComponent,
    OssControlComponent,
    TeamControlComponent,
    DocumentControlComponent,
    AccountListComponent,
    SourceUploadComponent,
    SubjectControlComponent,
    SourceFilesComponent,
    GithubRepoControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilitiesModule,
    TextareaModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonDirective,
    ButtonColorDirective,
    ButtonSizeDirective,
    DirectoryChooserDirective,
    DropFilesDirective,
    FileChooserDirective,
    InputDirective,
    SearchControlComponent,
    SelectableButtonControlComponent,
    SelectControlComponent,
    BannerControlComponent,
    SourceControlComponent,
    OssControlComponent,
    TeamControlComponent,
    DocumentControlComponent,
    SubjectControlComponent,
    GithubRepoControlComponent,
  ],
  providers: [FileSizePipe]
})
export class ControlsModule { }
