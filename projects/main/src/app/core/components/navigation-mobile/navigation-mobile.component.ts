import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared';
import { environment } from '../../../../environments/environment';
import { URLS } from '../../../constants/urls';
import { NavigationService } from '../../services/navigation.service';

interface NavMenu {
  name: string;
  link?: string;
  subMenus?: NavMenu[];
}

@Component({
  selector: 'sw-navigation-mobile',
  templateUrl: './navigation-mobile.component.html',
  styleUrls: ['./navigation-mobile.component.scss']
})
export class NavigationMobileComponent implements OnInit {

  readonly HOME_URL = URLS.HOME.ROOT;
  readonly LOGIN_URL = URLS.ACCOUNT.LOGIN;
  readonly JOIN_URL = URLS.ACCOUNT.JOIN;
  readonly MY_PAGE_URL = URLS.MY_PAGE.ROOT;
  readonly CODE_URL = environment.codeUrl;

  prevY: number;

  menus: NavMenu[] = [
    {
      name: '사업 소개',
      subMenus: [
        { name: '인사말', link: URLS.ORGANIZATION.GREETINGS },
        { name: '사업목표', link: URLS.ORGANIZATION.OBJECTIVE },
        { name: '추진방향', link: URLS.ORGANIZATION.VISION },
        { name: '조직도', link: URLS.ORGANIZATION.MEMBER },
        { name: '교육시설', link: URLS.ORGANIZATION.FACILITY },
        { name: '오시는길', link: URLS.ORGANIZATION.LOCATION },
      ]
    },
    {
      name: 'SW교육',
      subMenus: [
        { name: 'SW기초교육', link: URLS.EDUCATION.BASIC },
        { name: 'SW전공교육', link: URLS.EDUCATION.MAJOR },
        { name: 'SW융합교육', link: URLS.EDUCATION.CONVERGENCE },
        { name: '오픈소스SW', link: URLS.EDUCATION.OSS },
        { name: 'EASY코스', link: URLS.EDUCATION.EASY },
        { name: '마일리지장학금', link: URLS.EDUCATION.MILEAGE },
      ]
    },
    {
      name: '가디언프로그램',
      subMenus: [
        { name: '1인 1가디언', link: URLS.GUARDIAN.ONE2ONE },
      ],
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
        { name: 'SW봉사단', link: URLS.VALUE.VOLUNTEER }
      ]
    },
    {
      name: '커뮤니티',
      subMenus: [
        { name: '공지사항', link: URLS.COMMUNITY.NOTICE },
        { name: 'E-헬프데스크', link: URLS.COMMUNITY.E_HELP },
        { name: '보도자료', link: URLS.COMMUNITY.PRESS },
        { name: '뉴스레터', link: URLS.COMMUNITY.NEWSLETTER },
        { name: '해외교육 참여 및 활동기', link: URLS.COMMUNITY.OVERSEAS },
        { name: '학생활동사례', link: URLS.COMMUNITY.STUDENT_ACTIVITY },
        { name: '포토갤러리', link: URLS.COMMUNITY.GALLERY },
        { name: '자료실', link: URLS.COMMUNITY.ARCHIVE },
      ]
    },
  ];

  @ViewChild('navBody') navBodyRef: ElementRef;

  @HostListener('wheel', ['$event'])
  handleWheel(e: WheelEvent): void {
    if (this.navBodyRef) {
      this.navBodyRef.nativeElement.scrollTop += e.deltaY;
    }
    e.preventDefault();
  }

  @HostListener('touchstart', ['$event'])
  handleTouched(e: TouchEvent): void {
    this.prevY = e.targetTouches[0].clientY;

  }

  @HostListener('touchmove', ['$event'])
  handleTouchmove(e: TouchEvent): void {
    const y = e.targetTouches[0].clientY;
    const deltaY = this.prevY - y;
    this.prevY = y;
    if (this.navBodyRef) {
      this.navBodyRef.nativeElement.scrollTop += deltaY;
    }
    e.preventDefault();
  }

  constructor(public auth: AuthService,
              public navigation: NavigationService,
              // private platform: PlatformService,
              private router: Router) {
  }

  close(): void {
    this.navigation.hidden = true;
  }

  logout(): boolean {
    this.auth.logout();
    this.close();
    return false;
  }

  movePage(url: string): boolean {
    if (url) {
      this.router.navigateByUrl(url);
      this.navigation.hidden = true;
      this.close();
    }
    return false;
  }

  ngOnInit(): void {
  }
}
