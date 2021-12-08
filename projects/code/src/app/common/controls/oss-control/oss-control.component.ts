import { Component, forwardRef, OnInit, Provider } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IProjectOss } from '../../../types/local-project';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => OssControlComponent),
  multi: true,
};

@Component({
  selector: 'sw-oss-control',
  templateUrl: './oss-control.component.html',
  styleUrls: ['./oss-control.component.scss'],
  providers: [VALUE_ACCESSOR]
})
export class OssControlComponent implements ControlValueAccessor, OnInit {

  value: IProjectOss[] = [];

  private onChange: any;
  private onTouch: any;

  constructor() {
  }

  addOss(): void {
    this.value.push({ name: null, link: null, license: null, description: null });
    this._change();
  }

  changeDescription(oss: IProjectOss, description: string): void {
    oss.description = description;
    this._change();
  }

  changeLicense(oss: IProjectOss, license: string): void {
    oss.license = license;
    this._change();
  }

  changeLink(oss: IProjectOss, link: string): void {
    oss.link = link;
    this._change();
  }

  changeName(oss: IProjectOss, name: string): void {
    oss.name = name;
    this._change();
  }

  remove(index: number): void {
    this.value.splice(index, 1);
    this._change();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: IProjectOss[]): void {
    this.value = value || [];
  }

  ngOnInit(): void {
  }

  private _change(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }
}
