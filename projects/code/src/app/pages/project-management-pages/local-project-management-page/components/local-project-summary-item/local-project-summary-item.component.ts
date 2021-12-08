import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-local-project-summary-item',
  templateUrl: './local-project-summary-item.component.html',
  styleUrls: ['./local-project-summary-item.component.scss']
})
export class LocalProjectSummaryItemComponent implements OnInit {

  @Input() title: string;
  @Input() value: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
