import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IAddressResponse, ICoordinatesParams, ICoordinatesResponse } from '../../models/address-response';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ApiBase {
  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/address');
  }

  search(params?: IParams): Observable<IListResponse<IAddressResponse>> {
    return this.http.get(this.url`/`, { params: ApiBase.params(params) });
  }

  getCoordinates(params?: ICoordinatesParams): Observable<IResponse<ICoordinatesResponse>> {
    return this.http.get(this.url`/coords`, { params: ApiBase.params(params as IParams) });
  }
}
