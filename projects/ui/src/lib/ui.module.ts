import { NgModule } from '@angular/core';
import { BackgroundModule } from './background/background.module';
import { FileModule } from './file/file.module';
import { InnerHtmlModule } from './inner-html/inner-html.module';
import { PaginationModule } from './pagination/pagination.module';
import { TextareaModule } from './textarea/textarea.module';

@NgModule({
  declarations: [
  ],
  imports: [
    BackgroundModule,
    FileModule,
    InnerHtmlModule,
    PaginationModule,
    TextareaModule,
  ],
  exports: [
    BackgroundModule,
    FileModule,
    InnerHtmlModule,
    PaginationModule,
    TextareaModule,
  ]
})
export class UiModule { }
