import { CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, forwardRef, OnDestroy, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IGalleryPicture, UploadService } from 'shared';
import { LayoutService } from 'ui';

const CONTROL_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PicturesControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-pictures-control',
  templateUrl: './pictures-control.component.html',
  styleUrls: ['./pictures-control.component.scss'],
  providers: [CONTROL_ACCESSOR]
})
export class PicturesControlComponent implements ControlValueAccessor, OnInit, OnDestroy {

  private _subscription: Subscription;
  private onChange: any;
  private onTouched: any;

  cols = 2;
  value: IGalleryPicture[] = [];

  dragIndex = -1;

  constructor(private uploadService: UploadService,
              private layout: LayoutService) {
  }

  addImages(images: File[]): void {
    from(images).pipe(
      mergeMap(img => this.uploadService.upload(img), 5)
    ).subscribe(
      res => this.value.push({ url: res.url, caption: '' }),
      err => console.error(err),
      () => this.change()
    );
  }

  entered(e: CdkDragEnter): void {
    moveItemInArray(this.value, e.item.data, e.container.data);
    this.change();
  }

  changeCaption(index: number, caption: string): void {
    this.value[index].caption = caption;
    this.change();
  }

  removePicture(index: number): void {
    this.value.splice(index, 1);
    this.change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.value = obj || [];
  }

  ngOnInit(): void {
    this._subscription = this.layout.type$.subscribe(
      type => this.cols = type === 'desktop' ? 2 : 1
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  private change(): void {
    if (this.value.length > 0) {
      this.onChange(this.value);
    } else {
      this.onChange(null);
    }
  }
}
