import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Provider,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISelectOption } from '../../../types/select-option';

const VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectControlComponent),
  multi: true
};

@Component({
  selector: 'sw-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  providers: [VALUE_ACCESSOR],
})
export class SelectControlComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  value: any;
  hiddenPopup: boolean = true;

  @Input() options: ISelectOption<any>[] = [];
  @Input() placeholder: string = '선택';
  @ViewChild('popupRef') popupRef: ElementRef;

  private onChange: any;
  private onTouch: any;

  constructor(private renderer: Renderer2) {
  }

  get selected(): ISelectOption<any> {
    return this.options.find(option => option.value == this.value) || { value: null };
  }

  get popupHeight(): string {
    if (this.hiddenPopup) {
      return '0';
    }
    const height = this.options.length * 36 + 8;
    return `${height}px`;
  }

  changeValue(value: any): void {
    this.value = value;
    if (this.onChange) {
      this.onChange(this.value);
    }
    this.togglePopup();
  }

  togglePopup(): void {
    this.hiddenPopup = !this.hiddenPopup;
    this.renderer.setStyle(this.popupRef.nativeElement, 'height', this.popupHeight);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: any): void {
    this.value = value;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.popupRef.nativeElement, 'height', this.popupHeight);
  }

}
