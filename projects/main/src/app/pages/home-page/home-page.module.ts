import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { BackgroundModule } from 'ui';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { BannerComponent } from './components/banner/banner.component';
import { GridButtonsComponent } from './components/grid-buttons/grid-buttons.component';
import { LinkBannerComponent } from './components/link-banner/link-banner.component';
import { MainSlidesComponent } from './components/main-slides/main-slides.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    HomePageComponent,
    MainSlidesComponent,
    BannerComponent,
    ArticleListComponent,
    GridButtonsComponent,
    LinkBannerComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    BackgroundModule,
    RouterModule,
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
