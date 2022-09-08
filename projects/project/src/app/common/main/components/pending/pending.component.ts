import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sw-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  @Input() sizeClass = 'h-14 w-14';

  constructor() { }

  ngOnInit(): void {
  }

}
