import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'sw-responsive-container',
  templateUrl: './responsive-container.component.html',
  styleUrls: ['./responsive-container.component.scss']
})
export class ResponsiveContainerComponent implements OnInit {

  @HostBinding('style.max-width') maxWidth = '1280px';

  constructor() { }

  ngOnInit(): void {
  }

}
