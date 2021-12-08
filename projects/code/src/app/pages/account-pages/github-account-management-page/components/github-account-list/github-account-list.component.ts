import { Component, Input, OnInit } from '@angular/core';
import { IGithubAccount } from 'shared';

@Component({
  selector: 'sw-github-account-list',
  templateUrl: './github-account-list.component.html',
  styleUrls: ['./github-account-list.component.scss']
})
export class GithubAccountListComponent implements OnInit {

  @Input() accounts: IGithubAccount[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
