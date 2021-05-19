import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GalleryService, IGallery, PlatformService } from 'shared';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-gallery-detail-page',
  templateUrl: './gallery-detail-page.component.html',
  styleUrls: ['./gallery-detail-page.component.scss']
})
export class GalleryDetailPageComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;

  readonly GALLERY_LIST_URL = URLS.COMMUNITY.GALLERY;

  gallery: IGallery;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private platform: PlatformService,
              private galleryService: GalleryService) {
  }

  ngOnInit(): void {
    this._subscription = this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.galleryService.getGallery(id))
    ).subscribe(
      res => this.gallery = res.data,
      err => {
        if (this.platform.isBrowser) {
          const message = err.status === 404 ? '찾을 수 없는 갤러리입니다.' : err.error && err.error.message || err.message;
          alert(message);
          this.router.navigateByUrl(this.GALLERY_LIST_URL);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
