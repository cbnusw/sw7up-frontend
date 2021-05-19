import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IResource, PlatformService, ResourceService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-archive-detail-page',
  templateUrl: './archive-detail-page.component.html',
  styleUrls: ['./archive-detail-page.component.scss']
})
export class ArchiveDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  readonly ARCHIVE_URL = URLS.COMMUNITY.ARCHIVE;

  archive: IResource;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private resourceService: ResourceService) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.resourceService.getResource(id))
    ).subscribe(
      res => this.archive = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 자료입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl(this.ARCHIVE_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
