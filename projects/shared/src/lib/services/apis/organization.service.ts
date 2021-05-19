import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IOrganization } from '../../models/organization';
import { IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/organization');
  }

  getOrganization(): Observable<IResponse<IOrganization>> {
    return this.http.get(this.url`/`);
  }

  updateOrganization(body: IOrganization): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/`, body);
  }
}
