import { Component, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';

@Component({
  selector: 'sw-internship-page',
  templateUrl: './internship-page.component.html',
  styleUrls: ['./internship-page.component.scss']
})
export class InternshipPageComponent implements OnInit {

  readonly INTERNSHIP_E_BOOK_URL = URLS.COOPERATE.INTERNSHIP_E_BOOK;

  constructor() { }

  ngOnInit(): void {
  }

}
