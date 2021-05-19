import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IGallery } from '../../models/gallery';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class GalleryService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/gallery');
  }

  search(params?: IParams): Observable<IListResponse<IGallery>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getGallery(id: string): Observable<IResponse<IGallery>> {
    return this.http.get(this.url`/${id}`);
  }

  createGallery(body: IGallery): Observable<IResponse<IGallery>> {
    return this.http.post(this.url`/`, body);
  }

  updateGallery(id: string, body: IGallery): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${id}`, body);
  }

  removeGallery(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }
}
