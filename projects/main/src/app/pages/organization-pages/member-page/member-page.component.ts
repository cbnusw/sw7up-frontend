import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.scss']
})
export class MemberPageComponent implements OnInit {

  members = [
    {
      position: '팀장',
      task: '행정총괄',
      name: '김혜진',
      email: 'khj0824@cbnu.ac.kr',
      tel: '043-249-1885'
    },
    {
      position: '행정연구원',
      task: '전공 기초교육지원',
      name: '김샘이',
      email: 'u01200501n1@cbnu.ac.kr',
      tel: '043-249-1348'
    },
    {
      position: '행정연구원',
      task: '전공교육, 산학협력지원',
      name: '박지숙',
      email: 'pjs0212@cbnu.ac.kr',
      tel: '043-249-1832'
    },
    {
      position: '행정연구원',
      task: '산학협력지원, 홍보지원',
      name: '권이주',
      email: 'kej0505@cbnu.ac.kr',
      tel: '043-249-1346'
    },
    {
      position: '행정연구원',
      task: '오픈소스SW',
      name: '이사랑',
      email: 'lsrsw1354@cbnu.ac.kr',
      tel: '043-249-1354'
    },
    {
      position: '행정연구원',
      task: '',
      name: '정지윤',
      email: 'jjung12@chungbuk.ac.kr',
      tel: '043-249-1833'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
