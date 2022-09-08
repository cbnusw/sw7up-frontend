import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sw-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss']
})
export class CodeViewerComponent implements OnInit {

  @Input() code: { name: string; path: string; source: string; } | null = null;
  @Input() pending = false;
  @Output() closeChange: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
  }

  get path(): string {
    return this.pending ? '...' : this.code?.path?.replace(/^code-uploads\/code\/static\/projects\/[a-zA-Z\d]+?\/sources/, '');
  }

  ngOnInit(): void {
  }

}
