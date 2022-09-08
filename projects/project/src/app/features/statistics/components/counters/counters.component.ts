import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../services';

@Component({
  selector: 'sw-counters',
  templateUrl: './counters.component.html',
  styleUrls: ['./counters.component.scss']
})
export class CountersComponent implements OnInit {

  constructor(
    public counterService: CounterService,
  ) {
  }

  ngOnInit(): void {
  }

}
