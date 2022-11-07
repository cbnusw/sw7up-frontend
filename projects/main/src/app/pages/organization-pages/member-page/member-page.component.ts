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
      task: 'SW전공교육센터, 오픈소스SW센터',
      name: '김샘이',
      email: 'u01200501n1@cbnu.ac.kr',
      tel: '043-249-1348'
    },
    {
      position: '행정연구원',
      task: 'SW기초창업센터',
      name: '박지숙',
      email: 'pjs0212@cbnu.ac.kr',
      tel: '043-249-1832'
    },
    {
      position: '행정연구원',
      task: 'SW융합교육센터',
      name: '권이주',
      email: 'kej0505@cbnu.ac.kr',
      tel: '043-249-1346'
    },
    {
      position: '행정연구원',
      task: 'SW기초교육센터',
      name: '오유진',
      email: 'oujin@cbnu.ac.kr',
      tel: '043-249-1354'
    },
    {
      position: '행정연구원',
      task: 'SW산학협력센터',
      name: '김현진',
      email: 'khj1217@cbnu.ac.kr',
      tel: '043-249-1833'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }
}
