import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../../constants/urls';

interface BannerItem {
  name: string;
  activeImage: string;
  baseImage: string;
  link?: string;
  url?: string;
}

@Component({
  selector: 'sw-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  items: BannerItem[] = [
    {
      name: '사업단',
      baseImage: 'assets/images/home/banner-organization.base.svg',
      activeImage: 'assets/images/home/banner-organization.active.svg',
      link: URLS.ORGANIZATION.GREETINGS
    },
    {
      name: 'SW기초교육',
      baseImage: 'assets/images/home/banner-basic.base.svg',
      activeImage: 'assets/images/home/banner-basic.active.svg',
      link: URLS.EDUCATION.BASIC
    },
    {
      name: 'SW전공교육',
      baseImage: 'assets/images/home/banner-major.base.svg',
      activeImage: 'assets/images/home/banner-major.active.svg',
      link: URLS.EDUCATION.MAJOR
    },
    {
      name: 'SW융합교육',
      baseImage: 'assets/images/home/banner-convergence.base.svg',
      activeImage: 'assets/images/home/banner-convergence.active.svg',
      link: URLS.EDUCATION.CONVERGENCE
    },
    {
      name: 'SW산학협력',
      baseImage: 'assets/images/home/banner-industry.base.svg',
      activeImage: 'assets/images/home/banner-industry.active.svg',
      link: URLS.COOPERATE.PROJECT
    },
    {
      name: '오픈소스SW',
      baseImage: 'assets/images/home/banner-oss.base.svg',
      activeImage: 'assets/images/home/banner-oss.active.svg',
      link: URLS.EDUCATION.OSS
    },
    {
      name: 'CBNU MOOC',
      baseImage: 'assets/images/home/banner-mooc.base.svg',
      activeImage: 'assets/images/home/banner-mooc.active.svg',
      url: 'https://www.edwith.org/ptnr/cbnu'
    },

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
