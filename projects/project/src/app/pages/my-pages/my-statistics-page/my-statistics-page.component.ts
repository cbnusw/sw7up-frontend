import { Component } from '@angular/core';
import { MyStudentInfoService } from './services';

@Component({
  selector: 'sw-my-statistics-page',
  templateUrl: './my-statistics-page.component.html',
  styleUrls: ['./my-statistics-page.component.scss']
})
export class MyStatisticsPageComponent {
  constructor(public readonly studentInfoService: MyStudentInfoService) { }
}
