import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface IArticle {
  _id?: string;
  title?: string;
  createdAt?: Date;
}

@Component({
  selector: 'sw-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  @Input() title: string;
  @Input() moreLink: string;
  @Input() basePath: string;
  @Input() articles$: Observable<IArticle[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
