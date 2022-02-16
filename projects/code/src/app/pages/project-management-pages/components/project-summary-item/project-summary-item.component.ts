import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-project-summary-item',
  templateUrl: './project-summary-item.component.html',
  styleUrls: ['./project-summary-item.component.scss']
})
export class ProjectSummaryItemComponent implements OnInit {

  @Input() title: string;
  @Input() value: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
