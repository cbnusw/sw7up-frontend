import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry, timeout } from 'rxjs/operators';
import { IListResponse, IResponse, RequestBase, SharedConfig } from 'shared';
import { ILanguageFilter, IProjectLanguage } from '../types';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends RequestBase {

  projectLanguages$: Observable<IProjectLanguage[]>;
  availableLanguages$: Observable<ILanguageFilter[]>;

  private _projectLanguagesSubject: BehaviorSubject<IProjectLanguage[]> = new BehaviorSubject<IProjectLanguage[]>([]);
  private _availableLanguagesSubject: BehaviorSubject<ILanguageFilter[]> = new BehaviorSubject<ILanguageFilter[]>([]);

  constructor(
    private _http: HttpClient,
    config: SharedConfig
  ) {
    super(config.codeHost + '/languages');
    this.projectLanguages$ = this._projectLanguagesSubject.asObservable();
    this.availableLanguages$ = this._availableLanguagesSubject.asObservable();
    this._init();
  }

  get projectLanguages(): IProjectLanguage[] {
    return this._projectLanguagesSubject.value;
  }

  get availableLanguages(): ILanguageFilter[] {
    return this._availableLanguagesSubject.value;
  }

  addLanguage(name: string): void {
    this._http.post(this.url`/filters`, { name }).pipe(
      timeout(5000),
      retry(5),
    ).subscribe({
      next: () => this._init(),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`)
    });
  }

  removeLanguage(id: string): void {
    this._http.delete(this.url`/filters/${id}`).pipe(
      timeout(5000),
      retry(5),
    ).subscribe({
      next: () => this._init(),
      error: err => alert(`Error: ${err?.error?.code || err?.message}`),
    });
  }

  private _init(): void {
    this._getProjectLanguages(true).pipe(
      map(res => res.data),
    ).subscribe({
      next: data => this._projectLanguagesSubject.next(data),
      error: err => console.error(err),
    });

    this._searchAvaliableLanguages().pipe(
      map(res => res.data.documents)
    ).subscribe({
      next: documents => this._availableLanguagesSubject.next(documents),
      error: err => console.error(err),
    });
  }

  private _getProjectLanguages(filter: boolean): Observable<IResponse<IProjectLanguage[]>> {
    return this._http.get(this.url`/projects`, { params: { filter } }).pipe(
      timeout(5000),
      retry(5),
    );
  }

  private _searchAvaliableLanguages(): Observable<IListResponse<ILanguageFilter>> {
    return this._http.get(this.url`/filters`).pipe(
      timeout(5000),
      retry(5),
    );
  }
}
