import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBase } from 'shared';
import { environment } from '../../../../environments/environment';
import { LanguagesDto, StatService, StudentTopcitDto } from '../../../services/stat.service';

@Injectable({
  providedIn: 'root'
})
export class StudentStatService extends RequestBase {
  constructor(private readonly _service: StatService) {
    super(environment.codeHost + '/professors');
  }

  getLanguages(no: string): Observable<LanguagesDto> {
    return this._service.getStudentLanguages(no);
  }

  getTopcits(no: string): Observable<StudentTopcitDto[]> {
    return this._service.getStudentTopcits(no);
  }
}

