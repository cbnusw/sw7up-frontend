import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LanguagesDto, StatService } from '../../../../services/stat.service';
import { StudentDto } from '../../../../types';

@Component({
  selector: 'sw-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {
  @Input() student: StudentDto;

  pending = true;
  languages: LanguagesDto | null = null;

  constructor(private _statService: StatService) {
  }

  get numOfLanguages(): number {
    return Object.keys(this.languages.projects || {}).length;
  }

  ngOnInit(): void {
    this._statService.getStudentLanguages(this.student.no).pipe(
      finalize(() => this.pending = false)
    ).subscribe(languages => this.languages = languages);
  }
}
