import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'shared';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ProjectService } from '../../../services/project.service';
import { IMedia } from '../../../types/media';
import { IProject, IProjectApproval } from '../../../types/project';
import { TEntryList } from '../../../types/project-file';
import { ISelectOption } from '../../../types/select-option';

@Component({
  selector: 'sw-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit, OnDestroy {

  @ViewChild('slideRef') indicatorRef: SwiperComponent;

  document: IProject;
  swiperConfig: SwiperOptions = {
    speed: 300,
    direction: 'horizontal',
    allowTouchMove: false,
  };
  indicatorConfig: SwiperOptions = {
    speed: 300,
    direction: 'horizontal',
    slidesPerView: 4,
    spaceBetween: 16
  };
  media: IMedia;
  approvalOptions: ISelectOption<boolean>[] = [
    { viewValue: '승인', value: true },
    { viewValue: '미승인', value: false },
  ];

  private _approval: IProjectApproval = {
    value: false,
    date: null,
    reason: null,
  };

  private subscription: Subscription;

  constructor(public auth: AuthService,
              private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  get totalCodes(): number {
    return this.document ? this.document.meta &&
      this.document.meta.reduce((acc, info) => acc + info.codes, 0) : 0;
  }

  get totalComments(): number {
    return this.document ?
      this.document.meta && this.document.meta.reduce((acc, info) => acc + info.comments, 0) : 0;
  }

  get source(): TEntryList {
    return this.document.source;
  }

  set approval(approval: IProjectApproval) {
    this.document.approval = approval;
  }

  get approval(): IProjectApproval {
    this._approval = this.document?.approval || this._approval;
    return this._approval;
  }

  chnageIndicator(index: number): void {
    this.indicatorRef.setIndex(index, 300);
  }

  remove(): void {
    const yes = confirm('프로젝트를 삭제하시겠습니까?');
    if (!yes) {
      return;
    }
    this.projectService.removeProject(this.document._id).subscribe(
      () => {
        alert('프로젝트를 삭제하였습니다.');
        this.router.navigateByUrl('/pm/local');
      }
    );
  }

  approve(): void {
    const yes = confirm(`해당 프로젝트를 승인 하시겠습니까?`);
    if (!yes) {
      return;
    }
    this.projectService.approve(this.document._id, this.approval.value, this.approval.reason).subscribe(res => {
      alert('승인하였습니다.');
      this.approval = res.data;
    });
  }

  hideBanner(): void {
    this.media = null;
  }

  showBanner(banner: IMedia): void {
    this.media = banner;
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.projectService.getProject(id))
    ).subscribe(
      res => this.document = res.data,
      err => {
        alert(`에러: ${err.message}`);
        this.router.navigateByUrl('/pm/local');
      }
    );
  }

  ngOnDestroy(): void {
  }
}
