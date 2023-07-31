import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../../../services';
import { IProjectLanguage } from '../../../../types';

@Component({
  selector: 'sw-project-languages',
  templateUrl: './project-languages.component.html',
  styleUrls: ['./project-languages.component.scss']
})
export class ProjectLanguagesComponent implements OnInit {

  keyword = '';

  @Output() languageSelect: EventEmitter<IProjectLanguage> = new EventEmitter<IProjectLanguage>();

  constructor(
    public languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
  }

}
