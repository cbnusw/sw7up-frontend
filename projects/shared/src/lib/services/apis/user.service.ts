import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBase } from '../../classes/api-base';
import { IParams } from '../../models/params';
import { IListResponse, IResponse } from '../../models/response';
import { TUserPermission, TUserRole } from '../../models/user';
import { IUserInfo } from '../../models/user-info';
import { SharedConfig } from '../../shared-config';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiBase {

  constructor(private http: HttpClient,
              config: SharedConfig) {
    super(config, '/user');
  }

  searchMembers(params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.searchUser('member', params);
  }

  searchStudents(params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.searchUser('student', params);
  }

  searchStaffs(params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.searchUser('staff', params);
  }

  searchOperators(params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.searchUser('operator', params);
  }

  getMember(id: string): Observable<IResponse<IUserInfo>> {
    return this.getUser('member', id);
  }

  getStudent(id: string): Observable<IResponse<IUserInfo>> {
    return this.getUser('student', id);
  }

  getStaff(id: string): Observable<IResponse<IUserInfo>> {
    return this.getUser('staff', id);
  }

  getOperator(id: string): Observable<IResponse<IUserInfo>> {
    return this.getUser('operator', id);
  }

  registerStudent(body: IUserInfo): Observable<IResponse<IUserInfo>> {
    return this.registerUser('student', body);
  }

  registerStaff(body: IUserInfo): Observable<IResponse<IUserInfo>> {
    return this.registerUser('staff', body);
  }

  registerOperator(body: IUserInfo, permissions: TUserPermission[] = []): Observable<IResponse<IUserInfo>> {
    return this.registerUser('operator', body, permissions);
  }

  restore(id: string): Observable<IResponse<undefined>> {
    return this.http.post(this.url`/${id}/restore`, null);
  }

  updateStudent(id: string, body: IUserInfo): Observable<IResponse<undefined>> {
    return this.updateUser('student', id, body);
  }

  updateStaff(id: string, body: IUserInfo): Observable<IResponse<undefined>> {
    return this.updateUser('staff', id, body);
  }

  updateOperator(id: string, body: IUserInfo): Observable<IResponse<undefined>> {
    return this.updateUser('operator', id, body);
  }

  setPermissions(id: string, permissions: TUserPermission[]): Observable<IResponse<undefined>> {
    return this.http.patch(this.url`/${id}/permissions`, { permissions });
  }

  changeToOperatorRole(id: string): Observable<IResponse<undefined>> {
    return this.http.patch(this.url`/${id}/operator/change`, null);
  }

  removeOperatorRole(id: string): Observable<IResponse<undefined>> {
    return this.http.patch(this.url`/${id}/operator/remove`, null);
  }

  clearAllUser(): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/clear`);
  }

  removeUser(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}`);
  }

  clearUser(id: string): Observable<IResponse<undefined>> {
    return this.http.delete(this.url`/${id}/clear`);
  }

  private searchUser(type: TUserRole, params?: IParams): Observable<IListResponse<IUserInfo>> {
    return this.http.get(this.url`/${type}`, { params: ApiBase.params(params) });
  }

  private getUser(type: TUserRole, id: string): Observable<IResponse<IUserInfo>> {
    return this.http.get(this.url`/${type}/${id}`);
  }

  private registerUser(type: TUserRole,
                       body: IUserInfo,
                       permissions: TUserPermission[] = []): Observable<IResponse<IUserInfo>> {
    const { no } = body;
    const user = { no, permissions, info: body };
    return this.http.post(this.url`/${type}`, user);
  }

  private updateUser(type: TUserRole, id: string, body: IUserInfo): Observable<IResponse<undefined>> {
    return this.http.put(this.url`/${type}/${id}`, body);
  }
}
