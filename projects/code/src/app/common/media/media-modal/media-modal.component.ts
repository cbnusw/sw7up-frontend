import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMedia } from '../../../types/media';

@Component({
  selector: 'sw-media-modal',
  templateUrl: './media-modal.component.html',
  styleUrls: ['./media-modal.component.scss']
})
export class MediaModalComponent {

  @Output() closeChange: EventEmitter<undefined> = new EventEmitter<undefined>();

  @Input() media: IMedia;

  private _open: boolean;

  constructor() {
  }

  @Input() set open(value: boolean) {
    this._open = value;
  }

  get open(): boolean {
    return this._open;
  }

  closeModal(): void {
    this.closeChange.emit();
  }
}
