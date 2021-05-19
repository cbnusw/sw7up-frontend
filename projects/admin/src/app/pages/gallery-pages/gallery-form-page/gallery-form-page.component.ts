import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { AbstractFormDirective, GalleryService, IGallery, PlatformService } from 'shared';
import { ErrorMatcher } from '../../../classes/error-matcher';

@Component({
  selector: 'sw-gallery-form-page',
  templateUrl: './gallery-form-page.component.html',
  styleUrls: ['./gallery-form-page.component.scss']
})
export class GalleryFormPageComponent extends AbstractFormDirective<IGallery, boolean> implements OnInit {

  errorMatcher = new ErrorMatcher(this.submitted$, this.submissionError$);

  constructor(private galleryService: GalleryService,
              private router: Router,
              private route: ActivatedRoute,
              platform: PlatformService,
              fb: FormBuilder) {
    super(fb, false, platform);
  }

  removeGallery(): void {
    const yes = confirm('해당 보도자료를 삭제하시겠습니까?');

    if (yes) {
      this.galleryService.removeGallery(this.model._id).subscribe(
        () => {
          alert('갤러리를 삭제하였습니다.');
          this.router.navigateByUrl('/gallery/list');
        },
        err => alert => alert(`글 삭제에 실패하였습니다.\n${err.error && err.error.message || err.message}`)
      );
    }
  }

  protected async processAfterSubmission(s: boolean): Promise<void> {
    alert(`${this.modifying ? '수정' : '등록'}하였습니다.`);
    await this.router.navigateByUrl('/gallery/list');
  }


  protected processSubmissionError(e: HttpErrorResponse): void {
    alert(`${this.modifying ? '수정' : '등록'}에 실패하였습니다.\n${e.error && e.error.message || e.message}`);
  }

  protected initFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      title: [null, [Validators.required]],
      pictures: [null, [Validators.required]]
    });
  }

  protected requestObservable(m: IGallery): Observable<boolean> {
    const observable = this.modifying ? this.galleryService.updateGallery(this.model._id, m) : this.galleryService.createGallery(m);
    return observable.pipe(map(res => res.success));
  }


  ngOnInit(): void {
    super.ngOnInit();

    this.addSubscriptions(
      this.route.params.pipe(
        map(params => params.id),
        filter(id => !!id),
        switchMap(id => this.galleryService.getGallery(id))
      ).subscribe(
        res => this.model = res.data,
        err => {
          if (this.platform.isBrowser) {
            const message = err.status === 404 ? '찾을 수 없는 갤러리입니다.' : err.error && err.error.message || err.message;
            alert(message);
            this.router.navigateByUrl('/gallery/list');
          }
        }
      )
    );
  }
}
