import { Component, Input, OnInit } from '@angular/core';
import { Color } from '../../../../types';

@Component({
  selector: 'sw-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  static readonly STYLE_CLASSES = [
    'bg-primary-500 border-primary-600 hover:bg-primary-400 disabled:bg-primary-200 disabled:border-primary-300',
    'bg-secondary-500 border-secondary-600 hover:bg-secondary-400 disabled:bg-secondary-200 disabled:border-secondary-300',
    'bg-info-500 border-info-600 hover:bg-info-400 disabled:bg-info-200 disabled:border-info-300',
    'bg-danger-500 border-danger-600 hover:bg-danger-400 disabled:bg-danger-200 disabled:border-danger-300',
  ];
  @Input() type: 'button' | 'reset' | 'submit' = 'submit';
  @Input() name: string;
  @Input() disabled = false;

  styleClass: string = ButtonComponent.STYLE_CLASSES[Color.PRIMAARY];

  constructor() {
  }

  @Input() set color(color: Color) {
    this.styleClass = ButtonComponent.STYLE_CLASSES[color];
  }

  ngOnInit(): void {
  }

}
