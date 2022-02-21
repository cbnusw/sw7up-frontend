import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { ILanguageFilter, IProjectLanguage } from '../../../types/language';

@Component({
  selector: 'sw-language-management-page',
  templateUrl: './language-management-page.component.html',
  styleUrls: ['./language-management-page.component.scss']
})
export class LanguageManagementPageComponent implements OnInit {

  languages: IProjectLanguage[];
  filters: ILanguageFilter[];

  constructor(private languageService: LanguageService) {
  }

  load(): void {
    this.languageService.searchFilters().subscribe(
      res => this.filters = res.data?.documents || []
    );
  }

  addFilter(item: IProjectLanguage): void {
    const yes = confirm(`${item.language}를 프로젝트 소스 파일에서 제외하시겠습니까?`);
    if (!yes) {
      return;
    }
    this.languageService.createFilter(item.language).subscribe(
      () => this.load()
    );
  }

  removeFilter(filter: ILanguageFilter): void {
    const yes = confirm(`${filter.name}를 삭제하시겠습니까?`);
    if (!yes) {
      return;
    }
    this.languageService.removeFilter(filter._id).subscribe(
      () => this.load()
    );
  }

  ngOnInit(): void {
    this.languageService.getProjectLanguages(false).subscribe(
      res => this.languages = res.data
    );
    this.load();
  }
}
