import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'shared';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ProjectService } from '../../../services/project.service';
import { ILocalProject } from '../../../types/local-project';
import { IMedia } from '../../../types/media';
import { TEntryList } from '../../../types/project-file';

@Component({
  selector: 'sw-local-project-page',
  templateUrl: './local-project-page.component.html',
  styleUrls: ['./local-project-page.component.scss']
})
export class LocalProjectPageComponent implements OnInit, OnDestroy {

  @ViewChild('slideRef') indicatorRef: SwiperComponent;

  document: ILocalProject;
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

  get source(): TEntryList {
    return this.document && this.document.source as TEntryList;
  }

  chnageIndicator(index: number): void {
    console.log(index);
    this.indicatorRef.setIndex(index, 300);
  }

  remove(): void {
    const yes = confirm('프로젝트를 삭제하시겠습니까?');
    if (!yes) {
      return;
    }
    this.projectService.removeLocalProject(this.document._id).subscribe(
      () => {
        alert('프로젝트를 삭제하였습니다.');
        this.router.navigateByUrl('/pm/local');
      }
    );
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
      switchMap(id => this.projectService.getLocalProject(id))
    ).subscribe(
      res => this.document = res.data,
      err => {
        alert(`에러: ${err.message}`);
        this.router.navigateByUrl('/pm/local');
      });
  }

  ngOnDestroy(): void {
  }
}
