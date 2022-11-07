import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-sitemap-page',
  templateUrl: './sitemap-page.component.html',
  styleUrls: ['./sitemap-page.component.scss']
})
export class SitemapPageComponent implements OnInit {

  menus = [
    {
      name: '사업단소개',
      subMenus: [
        { name: '인사말', link: URLS.ORGANIZATION.GREETINGS },
        { name: '사업목표', link: URLS.ORGANIZATION.OBJECTIVE },
        { name: '추진방향', link: URLS.ORGANIZATION.VISION },
        { name: '조직도', link: URLS.ORGANIZATION.MEMBER },
        { name: '교육시설', link: URLS.ORGANIZATION.FACILITY },
        { name: '오시는 길', link: URLS.ORGANIZATION.LOCATION }
      ]
    },
    {
      name: 'SW교육',
      subMenus: [
        { name: 'SW기초교육', link: URLS.EDUCATION.BASIC },
        { name: 'SW전공교육', link: URLS.EDUCATION.MAJOR },
        { name: 'SW융합교육', link: URLS.EDUCATION.CONVERGENCE },
        { name: 'SW온라인교육', link: URLS.EDUCATION.ONLINE },
        { name: '오픈소스SW', link: URLS.EDUCATION.OSS },
        { name: 'EASY 코스', link: URLS.EDUCATION.EASY },
        { name: '마일리지 장학금', link: URLS.EDUCATION.MILEAGE }
      ]
    },
    {
      name: '산학협력',
      subMenus: [
        { name: '산학프로젝트', link: URLS.COOPERATE.PROJECT },
        { name: '인턴십', link: URLS.COOPERATE.INTERNSHIP },
        { name: '가족회사', link: URLS.COOPERATE.FAMILY_COMPANY },
        { name: '몰입교육', link: URLS.COOPERATE.IMMERSION_EDUCATION },
        { name: '1인 1가디언', link: URLS.COOPERATE.GUARDIAN },
        { name: '創-Up 프로그램', link: URLS.COOPERATE.STARTUP },
      ]
    },
    {
      name: 'SW가치확산',
      subMenus: [
        { name: 'SW가치확산', link: URLS.VALUE.SPREAD },
        { name: 'SW봉사단', link: URLS.VALUE.VOLUNTEER },
      ]
    },
    {
      name: '커뮤니티',
      subMenus: [
        { name: '공지사항', link: URLS.COMMUNITY.NOTICE },
        { name: 'E-헬프데스크', link: URLS.COMMUNITY.E_HELP },
        { name: '보도자료', link: URLS.COMMUNITY.PRESS },
        { name: '뉴스레터', link: URLS.COMMUNITY.NEWSLETTER },
        { name: '해외교육', link: URLS.COMMUNITY.OVERSEAS },
        { name: '학생활동사례', link: URLS.COMMUNITY.STUDENT_ACTIVITY },
        { name: '포토갤러리', link: URLS.COMMUNITY.GALLERY },
        { name: '자료실', link: URLS.COMMUNITY.ARCHIVE }
      ]
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
