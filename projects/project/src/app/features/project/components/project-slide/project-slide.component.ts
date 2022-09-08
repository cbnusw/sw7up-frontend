import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import SwiperCore, { Autoplay, Navigation, SwiperOptions, Thumbs } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { IProjectBanner } from '../../../../types';

SwiperCore.use([Autoplay, Navigation, Thumbs]);

@Component({
  selector: 'sw-project-slide',
  templateUrl: './project-slide.component.html',
  styleUrls: ['./project-slide.component.scss']
})
export class ProjectSlideComponent implements OnInit {

  @Input() editable = false;
  @Output() removeChange: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('mainSwiper') mainSwiper: SwiperComponent;
  @HostBinding('class.hidden') hidden = true;
  @HostBinding('class.block') block = false;

  playLink: string;
  isOpenViewer = false;
  mainConfig: SwiperOptions;

  indicatorConfig: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 4,
    breakpoints: {
      640: {
        slidesPerView: 6
      },
      768: {
        slidesPerView: 7,
      },
      1024: {
        slidesPerView: 8
      },
      1280: {
        slidesPerView: 9,
      }
    },
    navigation: true,
    freeMode: true,
    watchSlidesProgress: true,
  };

  private _slide: IProjectBanner[] = [];

  constructor() {
  }

  @Input() set slide(slide: IProjectBanner[]) {
    this._slide = slide || [];
    if (this._slide.length > 0) {
      this.hidden = false;
      this.block = true;
    }
  }

  get slide(): IProjectBanner[] {
    return this._slide;
  }

  playVideo(item: IProjectBanner): void {
    this.playLink = item.link;
    this.isOpenViewer = true;
  }

  setIndicator(swiper: any): void {
    this.mainConfig = {
      speed: 300,
      direction: 'horizontal',
      autoplay: {
        delay: 5000,
      },
      navigation: true,
      allowTouchMove: true,
      loop: true,
      thumbs: { swiper }
    };
  }

  ngOnInit(): void {
  }
}
