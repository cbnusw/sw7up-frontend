import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, map, switchMap } from 'rxjs/operators';
import { IUserInfo, PlatformService, UserService } from 'shared';
import { LayoutService } from 'ui';

@Component({
  selector: 'sw-student-detail-page',
  templateUrl: './student-detail-page.component.html',
  styleUrls: ['./student-detail-page.component.scss']
})
export class StudentDetailPageComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  student: IUserInfo;
  loading: boolean;

  constructor(public layout: LayoutService,
              private platform: PlatformService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  get eHelpPermission(): boolean {
    if (this.student && this.student.user) {
      return this.student.user.permissions.indexOf('qna') !== -1;
    }
    return false;
  }

  toggleEHelpPermission(): void {
    const { permissions } = this.student.user;
    if (this.eHelpPermission) {
      const idx = permissions.indexOf('qna');
      permissions.splice(idx, 1);
    } else {
      permissions.push('qna');
    }
    this.loading = true;
    this.userService.setPermissions(this.student._id, permissions).pipe(
      finalize(() => this.loading = false),
      switchMap(() => this.userService.getStudent(this.student._id))
    ).subscribe(
      res => this.student = res.data,
      err => console.error(err)
    );
  }

  remove(): void {
    const yes = confirm('사용자의 계정을 삭제하시겠습니까?');

    if (yes && this.student) {
      this.loading = true;
      this.userService.removeUser(this.student._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getStudent(this.student._id)),
      ).subscribe(
        res => {
          alert('계정을 삭제하였습니다.');
          this.student = res.data;
        },
        err => console.error(err)
      );
    }
  }

  restore(): void {
    const yes = confirm('사용자의 계정을 복구하시겠습니까?');

    if (yes && this.student) {
      this.loading = true;
      this.userService.restore(this.student._id).pipe(
        finalize(() => this.loading = false),
        switchMap(() => this.userService.getStudent(this.student._id))
      ).subscribe(
        res => {
          alert('계정을 복구하고 임시비밀번호를 회원의 이메일로 전송하였습니다.');
          this.student = res.data;
        },
        err => console.error(err)
      );
    }
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.userService.getStudent(id))
    ).subscribe(
      res => this.student = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 학생 정보입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl('/student/list');
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
