import { Component, Input, OnInit } from '@angular/core';
import { URLS } from '../../../constants/urls';
import { BreadcrumbService } from '../../services/breadcrumb.service';

@Component({
  selector: 'sw-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  readonly HOME_URL = URLS.HOME.ROOT;

  @Input() items: string[] = [];

  constructor(public breadcrumb: BreadcrumbService) { }

  ngOnInit(): void {
  }
}
