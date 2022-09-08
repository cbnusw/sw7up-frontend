import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../../../services';
import { IProjectLanguage } from '../../../../types';

@Component({
  selector: 'sw-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  keyword = '';

  @Output() languageSelect: EventEmitter<IProjectLanguage> = new EventEmitter<IProjectLanguage>();

  constructor(
    public languageService: LanguageService,
  ) {
  }

  ngOnInit(): void {
  }

}
