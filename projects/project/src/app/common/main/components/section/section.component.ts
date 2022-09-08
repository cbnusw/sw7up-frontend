import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
