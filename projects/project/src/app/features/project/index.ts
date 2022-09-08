import {
  CodeViewerComponent, MemberSearcherComponent, NoneMemberComponent,
  ProjectCardComponent,
  ProjectCardImageComponent,
  ProjectCardsComponent, ProjectDocumentsComponent,
  ProjectMetaChartsComponent, ProjectOssComponent, ProjectRepositoryComponent,
  ProjectSlideComponent,
  ProjectSlideItemComponent,
  ProjectSlideUploaderComponent, ProjectTeamComponent,
  SourceTreeComponent,
  SourceTreeItemComponent,
  VideoViewerComponent
} from './components';
import { ProjectBasicComponent } from './components/project-basic/project-basic.component';
import {
  DownloadDocumentLinkPipe,
  DownloadSourceLinkPipe,
  SplitLinesPipe,
  StaticUrlPipe,
  YoutubeThumbnailUrlPipe,
  YoutubeVideoUrlPipe
} from './pipes';

export * from './components';
export * from './services';
export * from './project.module';

export const Components = [
  CodeViewerComponent,
  MemberSearcherComponent,
  NoneMemberComponent,
  ProjectBasicComponent,
  ProjectCardComponent,
  ProjectCardImageComponent,
  ProjectCardsComponent,
  ProjectDocumentsComponent,
  ProjectMetaChartsComponent,
  ProjectOssComponent,
  ProjectRepositoryComponent,
  ProjectSlideComponent,
  ProjectSlideItemComponent,
  ProjectSlideUploaderComponent,
  ProjectTeamComponent,
  SourceTreeComponent,
  SourceTreeItemComponent,
  VideoViewerComponent,
];

export const Pipes = [
  DownloadDocumentLinkPipe,
  DownloadSourceLinkPipe,
  SplitLinesPipe,
  StaticUrlPipe,
  YoutubeVideoUrlPipe,
  YoutubeThumbnailUrlPipe,
];
