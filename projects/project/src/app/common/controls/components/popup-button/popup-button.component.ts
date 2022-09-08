import { Component, Input, OnInit } from '@angular/core';

export interface IPopupMenuItem {
  filter?: () => boolean;
  viewValue: () => string;
  styleClass?: () => string;
  action: () => any;
}

@Component({
  selector: 'sw-popup-button',
  templateUrl: './popup-button.component.html',
  styleUrls: ['./popup-button.component.scss']
})
export class PopupButtonComponent implements OnInit {

  @Input() items: IPopupMenuItem[] = [];

  isOpen = false;

  constructor() {
  }

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;

  }

  blur(event: FocusEvent): void {
    event.stopPropagation();
    this.isOpen = false;
  }

  execute(event: MouseEvent, action: () => any): void {
    event.stopPropagation();
    action();
    this.isOpen = false;
  }

  ngOnInit(): void {
  }
}
