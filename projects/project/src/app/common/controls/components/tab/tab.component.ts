import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ITabOption<T = any> {
  viewValue: string;
  value: T;
}

@Component({
  selector: 'sw-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  readonly LI_STYLE_CLASSES = [
    'border-b-0',
    'border-b-4 border-primary-600'
  ];

  readonly BUTTON_CLASSES = [
    'text-secondary-500',
    'text-secondary-800'
  ];

  @Input() selected: string | ITabOption;
  @Input() options: Array<string | ITabOption> = [];
  @Output() optionChange: EventEmitter<string | ITabOption> = new EventEmitter<string | ITabOption>();


  constructor() {
  }

  ngOnInit(): void {
    this.selected = this.selected || this.options[0];
  }

  change(option: string): void {
    this.selected = option;
    this.optionChange.emit(this.selected);
  }
}
