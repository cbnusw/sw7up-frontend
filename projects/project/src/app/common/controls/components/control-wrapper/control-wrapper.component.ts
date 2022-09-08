import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-control-wrapper',
  templateUrl: './control-wrapper.component.html',
  styleUrls: ['./control-wrapper.component.scss']
})
export class ControlWrapperComponent implements OnInit {

  @Input() required = false;
  @Input() label: string;
  @Input() hasHint = false;
  @Input() labelWidth = 'auto';

  constructor() {
  }

  ngOnInit(): void {
  }

}
