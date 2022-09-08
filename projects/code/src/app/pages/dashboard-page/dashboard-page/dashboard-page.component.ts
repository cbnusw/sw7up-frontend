import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sw-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init(): Promise<void> {
  }
}
