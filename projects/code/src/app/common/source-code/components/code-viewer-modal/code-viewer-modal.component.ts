import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sw-code-viewer-modal',
  templateUrl: './code-viewer-modal.component.html',
  styleUrls: ['./code-viewer-modal.component.scss']
})
export class CodeViewerModalComponent implements OnInit {

  @Output() closeChange: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Input() code: { name: string; path: string; source: string; };

  private _open: boolean;

  constructor() {
  }

  @Input() set open(value: boolean) {
    this._open = value;
  }

  get open(): boolean {
    return this._open;
  }

  get path(): string {
    const { path = '' } = this.code || {};
    return '/' + path.split('/').splice(6).join('/');
  }

  closeModal(): void {
    this.closeChange.emit();
  }

  ngOnInit(): void {
  }

}
