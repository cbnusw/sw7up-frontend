import { Component, ElementRef, forwardRef, Input, OnInit, Provider, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { IMedia } from '../../../types/media';
import { ISelectOption } from '../../../types/select-option';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BannerControlComponent),
  multi: true,
};


export declare type TBannerType = 'image' | 'video';

@Component({
  selector: 'sw-banner-control',
  templateUrl: './banner-control.component.html',
  styleUrls: ['./banner-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class BannerControlComponent implements ControlValueAccessor, OnInit {

  @Input() projectId: string;
  @ViewChild('linkRef') linkRef: ElementRef;
  count = 0;
  total = 0;

  value: IMedia[] = [];

  options: ISelectOption<TBannerType>[] = [
    { viewValue: '이미지', value: 'image' },
    { viewValue: '비디오', value: 'video' }
  ];

  type: TBannerType = 'image';

  private onChange: any;
  private onTouch: any;

  constructor(private projectService: ProjectService) {
  }

  addLink(link: string): void {
    this.value.push({ link, file: null });
    this.linkRef.nativeElement.value = null;
    this._change();
  }

  async changeFiles(files: File[]): Promise<void> {
    this.total = files.length;
    for (const file of files) {
      const { data } = await this.projectService.uploadProjectBanner(this.projectId, file).toPromise();
      this.count++;
      this.value.push({ file: data, link: null });
    }
    this.total = 0;
    this._change();
  }

  remove(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.value.splice(index, 1);
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IMedia[]): void {
    this.value = value || [];
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      this.value.length > 0 ? this.onChange(this.value) : this.onChange(null);
    }
  }
}
