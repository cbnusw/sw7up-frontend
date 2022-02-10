import { Component, OnInit } from '@angular/core';

interface IOnlineLecture {
  name: string;
  target?: string;
  link: string;
}

@Component({
  selector: 'sw-online-page',
  templateUrl: './online-page.component.html',
  styleUrls: ['./online-page.component.scss']
})
export class OnlinePageComponent implements OnInit {

  moocLectures: Array<IOnlineLecture> = [
    {
      name: '아두이노 프로그래밍',
      link: 'https://www.edwith.org/arduinoprogram',
    },
    {
      name: '정보기술의 이해',
      link: 'https://www.edwith.org/info01',
    },
    {
      name: '컴퓨팅 사고력 기르기',
      link: 'https://www.edwith.org/comthink',
    },
    {
      name: '스마트홈 구축을 위한 아두이노 센서 활용',
      link: 'https://www.edwith.org/iotsensor',
    },
    {
      name: '파이썬 프로그래밍',
      link: 'https://www.edwith.org/python5',
    },
    {
      name: '인공지능',
      link: 'https://www.edwith.org/ailecture',
    },
    {
      name: '빅데이터분석 시각화',
      link: 'https://www.edwith.org/bigdata1',
    },
  ];

  kocwLectures: Array<IOnlineLecture> = [
    {
      name: '기초컴퓨터프로그래밍(충북대학교 안재형)',
      target: '청소년/일반인/초・중등교사',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=1327393'
    },
    {
      name: '기초컴퓨터프로그래밍(충북대학교 이건명)',
      target: '청소년/일반인/초・중등교사',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=438105'
    },
    {
      name: '모바일프로그래밍실습',
      target: '일반인/대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=1188087'
    },
    {
      name: '선형대수학',
      target: '대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=908046'
    },
    {
      name: '웹기반 소프트웨어개발',
      target: '일반인/대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=1116118'
    },
    {
      name: '응용컴퓨터프로그래밍',
      target: '청소년/일반인/대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=1344156'
    },
    {
      name: '인간 상호작용 프로그램',
      target: '대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=849733'
    },
    {
      name: '인공지능',
      target: '일반인/재직자',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=1170523'
    },
    {
      name: '자료구조',
      target: '대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=446623'
    },
    {
      name: '자바프로그래밍',
      target: '일반인/대학생/초・중등교사',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=330713'
    },
    {
      name: '자바네트워크프로그래밍',
      target: '일반인',
      link: 'http://www.kocw.net/home/cview.do?cid=f126689618b77cf1'
    },
    {
      name: '컴퓨터그래픽스',
      target: '대학생',
      link: 'http://www.kocw.net/home/search/kemView.do?kemId=335239'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
