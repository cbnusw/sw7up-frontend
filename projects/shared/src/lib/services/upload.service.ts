import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestBase } from '../classes/request-base';
import { FILE_ACCESS, TFileAccess } from '../models/file';
import { IResponse, IUploadResponse } from '../models/response';
import { SharedConfig } from '../shared-config';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends RequestBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config.uploadHost);
  }

  download(id: string): Observable<any> {
    return this.http.get(this.url`/${id}/download`);
  }

  upload(file: File, access: TFileAccess[] = [...FILE_ACCESS]): Observable<IUploadResponse> {
    const formData = new FormData();
    formData.append('upload', file);
    access.forEach(a => formData.append('access[]', a));
    return this.http.post<IUploadResponse>(this.url`/`, formData);
  }

  removeByUrl(url: string): Observable<IResponse<undefined>> {
    const params = new HttpParams().set('url', url);
    return this.http.delete<IResponse<undefined>>(this.url`/`, { params });
  }

  removeById(id: string): Observable<IResponse<undefined>> {
    return this.http.delete<IResponse<undefined>>(this.url`/${id}`);
  }
}
