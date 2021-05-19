import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { IUserInfo, PlatformService, UserService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-operator-detail-page',
  templateUrl: './operator-detail-page.component.html',
  styleUrls: ['./operator-detail-page.component.scss']
})
export class OperatorDetailPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  operator: IUserInfo;
  loading: boolean;

  constructor(public layout: LayoutService,
              private platform: PlatformService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  get judgePermission(): boolean {
    if (this.operator && this.operator.user) {
      return this.operator.user.permissions.indexOf('judge') !== -1;
    }
    return false;
  }

  toggleJudgePermission(): void {
    const { permissions } = this.operator.user;

    if (this.judgePermission) {
      const idx = permissions.indexOf('judge');
      permissions.splice(idx, 1);
    } else {
      permissions.push('judge');
    }

    this.loading = true;
    this.userService.setPermissions(this.operator._id, permissions).pipe(
      finalize(() => this.loading = false),
      switchMap(() => this.userService.getOperator(this.operator._id))
    ).subscribe(
      res => this.operator = res.data,
      err => console.error(err)
    );
  }

  removeOperatorRole(): void {
    const yes = confirm('운영자 권한을 제거하시겠습니까?');

    if (!yes) {
      return;
    }

    this.loading = true;
    this.userService.removeOperatorRole(this.operator._id).pipe(
      finalize(() => this.loading = false)
    ).subscribe(
      () => {
        alert('운영자 권한을 제거하였습니다.');
        this.router.navigateByUrl('/operator/list');
      },
      err => console.error(err)
    );
  }

  remove(): void {
    const yes = confirm('사용자의 계정을 삭제하시겠습니까?');

    if (yes && this.operator) {
      this.loading = true;
      this.userService.removeUser(this.operator._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getOperator(this.operator._id)),
      ).subscribe(
        res => {
          alert('계정을 삭제하였습니다.');
          this.operator = res.data;
        },
        err => console.error(err)
      );
    }
  }

  restore(): void {
    const yes = confirm('사용자의 계정을 복구하시겠습니까?');

    if (yes && this.operator) {
      this.loading = true;
      this.userService.restore(this.operator._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getOperator(this.operator._id))
      ).subscribe(
        res => {
          alert('계정을 복구하고 임시비밀번호를 회원의 이메일로 전송하였습니다.');
          this.operator = res.data;
        },
        err => console.error(err)
      );
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.userService.getOperator(id))
    ).subscribe(
      res => this.operator = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 운영자 정보입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl('/operator/list');
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
