import { Component, OnInit, ViewChild } from '@angular/core';
import { PlatformService } from 'shared';
import SwiperCore, { Autoplay, EffectFade, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

interface Slide {
  image: string;
}

@Component({
  selector: 'sw-main-slides',
  templateUrl: './main-slides.component.html',
  styleUrls: ['./main-slides.component.scss']
})
export class MainSlidesComponent implements OnInit {

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    effect: 'fade',
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  };

  slides: Slide[] = [
    { image: 'assets/images/home/main-slide01.png' },
    { image: 'assets/images/home/main-slide02.png' },
  ];

  @ViewChild(SwiperComponent) swiper: SwiperComponent;

  constructor(public platform: PlatformService) {
    if (this.platform.isBrowser) {
      SwiperCore.use([Autoplay, EffectFade]);
    }
  }

  prev(): void {
    if (this.swiper) {
      this.swiper.swiperRef.slidePrev(500);
    }
  }

  next(): void {
    if (this.swiper) {
      this.swiper.swiperRef.slideNext(500);
    }
  }

  ngOnInit(): void {
  }
}
