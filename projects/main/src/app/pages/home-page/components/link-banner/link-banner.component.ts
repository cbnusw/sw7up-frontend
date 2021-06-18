import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlatformService } from 'shared';
import { SwiperOptions } from 'swiper';
import { LayoutService } from 'ui';

interface LinkSlide {
  title: string;
  description: string;
  logo: string;
  url: string;
}

@Component({
  selector: 'sw-link-banner',
  templateUrl: './link-banner.component.html',
  styleUrls: ['./link-banner.component.scss']
})
export class LinkBannerComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  config: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    // allowTouchMove: false,
    preventClicks: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }
  };

  slides: LinkSlide[] = [
    {
      title: 'TOPCIT',
      description: '온라인 학습 자료실',
      logo: 'assets/images/home/link-logo-topcit.png',
      url: 'https://www.topcit.or.kr'
    },
    // {
    //   title: '창의융합교육본부',
    //   description: '교수⋅학습 지원',
    //   logo: 'assets/images/home/link-logo-fole.png',
    //   url: 'http://fole.chungbuk.ac.kr'
    // },
    {
      title: 'SW중심대학',
      description: 'SW전문인력 양성',
      logo: 'assets/images/home/link-logo-swuniv.png',
      url: 'https://www.swuniv.kr'
    },
    {
      title: 'SW중심사회',
      description: '혁신과 성장, 가치창출',
      logo: 'assets/images/home/link-logo-software.png',
      url: 'http://software.kr'
    },
    {
      title: '과학기술정보통신부',
      description: '과학기술정책 총괄',
      logo: 'assets/images/home/link-logo-msit.png',
      url: 'https://www.msit.go.kr'
    }
  ];

  constructor(public platform: PlatformService,
              private layout: LayoutService) {
  }

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.subscription = this.layout.type$.subscribe(
        type => {
          const slidesPerView = type === 'desktop' ? 5 : 2;
          this.config = { ...this.config, slidesPerView };
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
