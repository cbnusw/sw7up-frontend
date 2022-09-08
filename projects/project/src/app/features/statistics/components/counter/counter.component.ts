import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() title: string;
  @Input() counter = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}
