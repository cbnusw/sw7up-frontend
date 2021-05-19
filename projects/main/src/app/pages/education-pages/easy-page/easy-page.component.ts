import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-easy-page',
  templateUrl: './easy-page.component.html',
  styleUrls: ['./easy-page.component.scss']
})
export class EasyPageComponent implements OnInit {

  courses1 = [
    {
      type: '이론',
      title: '정보기술의 이해',
      background: 'assets/images/education/easy/cover01.jpg',
      link: '/education/easy/1'
    },
    {
      type: '이론+실습',
      title: '파이썬 프로그래밍',
      background: 'assets/images/education/easy/cover02.jpg',
      link: '/education/easy/2'
    },
    {
      type: '이론+실습',
      title: 'IoT 기술과 프로그래밍',
      background: 'assets/images/education/easy/cover03.jpg',
      link: '/education/easy/3'
    },
    {
      type: '이론+실습',
      title: '인공지능과 기계학습',
      background: 'assets/images/education/easy/cover04.jpg',
      link: '/education/easy/4'
    },
    {
      type: '이론+실습',
      title: '빅데이터 이해와 분석',
      background: 'assets/images/education/easy/cover05.jpg',
      link: '/education/easy/5'
    }
  ];

  courses2 = [
    {
      type: '이론+실습',
      title: '자료구조와 문제해결',
      background: 'assets/images/education/easy/cover06.jpg',
      link: '/education/easy/6'
    },
    {
      type: '이론+실습',
      title: '운영체제의 이해',
      background: 'assets/images/education/easy/cover01.jpg',
      link: '/education/easy/7'
    },
    {
      type: '이론+실습',
      title: '자바프로그래밍',
      background: 'assets/images/education/easy/cover02.jpg',
      link: '/education/easy/8'
    },
    {
      type: '이론+실습',
      title: '웹 응용 프로그래밍',
      background: 'assets/images/education/easy/cover03.jpg',
      link: '/education/easy/9'
    },
    {
      type: '이론+실습',
      title: '모바일 프로그래밍',
      background: 'assets/images/education/easy/cover04.jpg',
      link: '/education/easy/10'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
