import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { IUserInfo, PlatformService, UserService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-member-detail-page',
  templateUrl: './member-detail-page.component.html',
  styleUrls: ['./member-detail-page.component.scss']
})
export class MemberDetailPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  member: IUserInfo;
  loading: boolean;

  constructor(public layout: LayoutService,
              private platform: PlatformService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  remove(): void {
    const yes = confirm('회원의 계정을 삭제하시겠습니까?');

    if (yes && this.member) {
      this.loading = true;
      this.userService.removeUser(this.member._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getMember(this.member._id)),
      ).subscribe(
        res => {
          alert('계정을 삭제하였습니다.\n해당 회원은 더이상 로그인할 수 없습니다.');
          this.member = res.data;
        },
        err => console.error(err)
      );
    }
  }

  restore(): void {
    const yes = confirm('회원의 계정을 복구하시겠습니까?');

    if (yes && this.member) {
      this.loading = true;
      this.userService.restore(this.member._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getMember(this.member._id))
      ).subscribe(
        res => {
          alert('계정을 복구하고 임시비밀번호를 회원의 이메일로 전송하였습니다.');
          this.member = res.data;
        },
        err => console.error(err)
      );
    }
  }

  clear(): void {
    const yes = confirm('회원을 영구 삭제하시겠습니까?');
    if (yes && this.member) {
      this.loading = true;
      this.userService.clearUser(this.member._id).subscribe(
        res => {
          alert('회원을 영구 삭제하였습니다.\n일반회원 관리 페이지로 이동합니다.');
          this.router.navigateByUrl('/member/list');
        },
        err => console.error(err)
      );
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.userService.getMember(id))
    ).subscribe(
      res => this.member = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 회원 정보입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl('/member/list');
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
