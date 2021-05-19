import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { IUserInfo, PlatformService, UserService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-staff-detail-page',
  templateUrl: './staff-detail-page.component.html',
  styleUrls: ['./staff-detail-page.component.scss']
})
export class StaffDetailPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  staff: IUserInfo;
  loading: boolean;

  constructor(public layout: LayoutService,
              private platform: PlatformService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  get judgePermission(): boolean {
    if (this.staff && this.staff.user) {
      return this.staff.user.permissions.indexOf('judge') !== -1;
    }
    return false;
  }

  toggleJudgePermission(): void {
    const { permissions } = this.staff.user;

    if (this.judgePermission) {
      const idx = permissions.indexOf('judge');
      permissions.splice(idx, 1);
    } else {
      permissions.push('judge');
    }

    this.loading = true;
    this.userService.setPermissions(this.staff._id, permissions).pipe(
      finalize(() => this.loading = false),
      switchMap(() => this.userService.getStaff(this.staff._id))
    ).subscribe(
      res => this.staff = res.data,
      err => console.error(err)
    );
  }

  changeToOperatorRole(): void {
    const yes = confirm('운영자로 변경하시겠습니까?');

    if (!yes) {
      return;
    }

    this.loading = true;
    this.userService.changeToOperatorRole(this.staff._id).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      () => {
        alert('운영자로 변경되었습니다.');
        this.router.navigateByUrl('/staff/list');
      },
      err => console.error(err)
    );

  }

  remove(): void {
    const yes = confirm('사용자의 계정을 삭제하시겠습니까?');

    if (yes && this.staff) {
      this.loading = true;
      this.userService.removeUser(this.staff._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getStaff(this.staff._id)),
      ).subscribe(
        res => {
          alert('계정을 삭제하였습니다.');
          this.staff = res.data;
        },
        err => console.error(err)
      );
    }
  }

  restore(): void {
    const yes = confirm('사용자의 계정을 복구하시겠습니까?');

    if (yes && this.staff) {
      this.loading = true;
      this.userService.restore(this.staff._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getStaff(this.staff._id))
      ).subscribe(
        res => {
          alert('계정을 복구하고 임시비밀번호를 회원의 이메일로 전송하였습니다.');
          this.staff = res.data;
        },
        err => console.error(err)
      );
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.userService.getStaff(id))
    ).subscribe(
      res => this.staff = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 교직원 정보입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl('/staff/list');
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
