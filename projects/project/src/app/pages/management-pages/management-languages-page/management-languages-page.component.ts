import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services';
import { ILanguageFilter, IProjectLanguage } from '../../../types';

@Component({
  selector: 'sw-management-languages-page',
  templateUrl: './management-languages-page.component.html',
  styleUrls: ['./management-languages-page.component.scss']
})
export class ManagementLanguagesPageComponent implements OnInit {

  constructor(
    private _languageService: LanguageService,
  ) {
  }

  addLanguage(languageItem: IProjectLanguage): void {
    this._languageService.addLanguage(languageItem.language);
  }

  removeLanguage(item: ILanguageFilter): void {
    this._languageService.removeLanguage(item._id);
  }

  ngOnInit(): void {
  }
}
