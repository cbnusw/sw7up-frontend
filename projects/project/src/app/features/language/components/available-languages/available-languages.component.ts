import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../../../services';
import { ILanguageFilter } from '../../../../types';

@Component({
  selector: 'sw-available-languages',
  templateUrl: './available-languages.component.html',
  styleUrls: ['./available-languages.component.scss']
})
export class AvailableLanguagesComponent implements OnInit {

  @Output() languageSelect: EventEmitter<ILanguageFilter> = new EventEmitter<ILanguageFilter>();

  constructor(
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
  }

}
