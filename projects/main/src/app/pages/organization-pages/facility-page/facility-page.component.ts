import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-facility-page',
  templateUrl: './facility-page.component.html',
  styleUrls: ['./facility-page.component.scss']
})
export class FacilityPageComponent implements OnInit {

  documents = [
    {
      name: '가디언스라운지',
      location: 'E9동 306호',
      images: 'assets/images/organization/facility/1.jpg'
    },
    {
      name: 'EASY코스 학습실-1',
      location: 'E9동 241호',
      images: 'assets/images/organization/facility/2.jpg'
    },
    {
      name: 'EASY코스 학습실-2',
      location: 'E9동 271호',
      images: 'assets/images/organization/facility/3.jpg'
    },
    {
      name: '오픈소스SW 학습실',
      location: 'E9동 308호',
      images: 'assets/images/organization/facility/4.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-1',
      location: 'S4-1동 205호',
      images: 'assets/images/organization/facility/5.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-2',
      location: 'E8-1동 437호',
      images: 'assets/images/organization/facility/6.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-3',
      location: 'E8-7동 417호',
      images: 'assets/images/organization/facility/7.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-4',
      location: 'E8-8동 209호',
      images: 'assets/images/organization/facility/8.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-5',
      location: 'S1-2동 108호',
      images: 'assets/images/organization/facility/9.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-6',
      location: 'E10동 120호',
      images: 'assets/images/organization/facility/10.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-7',
      location: 'E10동 318호',
      images: 'assets/images/organization/facility/11.jpg'
    },
    {
      name: '오픈소스SW 전용 실습실-8',
      location: 'S2동 102호',
      images: 'assets/images/organization/facility/12.jpg'
    },
    {
      name: '이러닝 스튜디오(S4-1동 210호)',
      location: 'S1-2동 108호',
      images: 'assets/images/organization/facility/13.jpg'
    },
    {
      name: 'IoT플레이그리운드',
      location: 'E9동 307호',
      images: 'assets/images/organization/facility/14.jpg'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
