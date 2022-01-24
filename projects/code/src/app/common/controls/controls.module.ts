import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaModule } from 'ui';
import { SourceCodeModule } from '../source-code/source-code.module';
import { FileSizePipe } from '../utilities/pipes/file-size.pipe';
import { UtilitiesModule } from '../utilities/utilities.module';
import { BannerControlComponent } from './components/banner-control/banner-control.component';
import { ButtonColorDirective } from './directives/button-color.directive';
import { ButtonSizeDirective } from './directives/button-size.directive';
import { ButtonDirective } from './directives/button.directive';
import { DirectoryChooserDirective } from './directives/directory-chooser.directive';
import { DropFilesDirective } from './directives/drop-files.directive';
import { FileChooserDirective } from './directives/file-chooser.directive';
import { InputDirective } from './directives/input.directive';
import { DocumentControlComponent } from './components/document-control/document-control.component';
import { MentoControlComponent } from './components/mento-control/mento-control.component';
import { OssControlComponent } from './components/oss-control/oss-control.component';
import { OwnProjectControlComponent } from './components/own-project-control/own-project-control.component';
import { SearchControlComponent } from './components/search-control/search-control.component';
import { SelectControlComponent } from './components/select-control/select-control.component';
import { SelectableButtonControlComponent } from './components/selectable-button-control/selectable-button-control.component';
import { SourceControlComponent } from './components/source-control/source-control.component';
import { SourceFilesComponent } from './components/source-control/source-files/source-files.component';
import { SourceUploadComponent } from './components/source-control/source-upload/source-upload.component';
import { SubjectControlComponent } from './components/subject-control/subject-control.component';
import { AccountListComponent } from './components/team-control/account-list/account-list.component';
import { TeamControlComponent } from './components/team-control/team-control.component';
import { GithubRepoControlComponent } from './components/github-repo-control/github-repo-control.component';
import { TextareaDirective } from './directives/textarea.directive';
import { TextareaAutoHeightDirective } from './directives/textarea-auto-height.directive';
import { NotJoinedMemberControlComponent } from './components/team-control/not-joined-member-control/not-joined-member-control.component';


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
    MentoControlComponent,
    OwnProjectControlComponent,
    TextareaDirective,
    TextareaAutoHeightDirective,
    NotJoinedMemberControlComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilitiesModule,
    TextareaModule,
    ReactiveFormsModule,
    SourceCodeModule
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
    OwnProjectControlComponent,
    TextareaDirective,
    TextareaAutoHeightDirective,
  ],
  providers: [FileSizePipe]
})
export class ControlsModule { }
