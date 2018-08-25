import { Injectable } from '@angular/core';
import { Group } from './group.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { SimpleDataSource } from '../app-common/pagination-data-source';

export class GroupDataSource extends SimpleDataSource<Group> {}

@Injectable()
export class GroupService {
  private dataUpdateEvent: Subject<boolean> = new Subject();
  constructor(private http: HttpClient) {}

  getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(`api/security/group/${id}`);
  }

  getGroupDataSource(pageSize: number): Observable<GroupDataSource> {
    const groupSource = new GroupDataSource(pageSize, (offset, limit) => {
      return this.http
        .get(`api/security/group/`, {
          params: new HttpParams()
            .set('offset', offset + '')
            .set('limit', limit + '')
        })
        .pipe(
          map((res: any) => {
            return {
              total: res.total || 0,
              items: res.groups
            };
          })
        );
    });
    groupSource.setCurrentPage(0);
    return of(groupSource);
  }
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`api/security/group/`);
  }

  updateGroup(group: Group): Observable<any> {
    return this.http.put(`api/security/group/${group.id}`, group);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http
      .post<Group>(`api/security/group/`, group)
      .pipe(tap(() => this.notifyChanges()));
  }

  deleteGroup(group: Group): Observable<Group> {
    return this.http
      .delete<Group>(`api/security/group/${group.id}`)
      .pipe(tap(() => this.notifyChanges()));
  }

  existGroup(name: string): Observable<boolean> {
    return this.http.get<boolean>(`api/security/group/exists/${name}`);
  }

  addUserToGroup(userId: string, groupId: string): Observable<any> {
    return this.http.put(`api/security/group/${groupId}/user/${userId}`, {});
  }

  removeUserFromGroup(userId: string, groupId: string): Observable<any> {
    return this.http.delete(`api/security/group/${groupId}/user/${userId}`, {});
  }

  addPermissionToGroup(groupId: string, permissionId: string): Observable<any> {
    return this.http.put(
      `api/security/group/${groupId}/permission/${permissionId}`,
      {}
    );
  }

  getPermissionForGroup(groupId: string): Observable<any> {
    return this.http.get(`api/security/group/${groupId}/permission`);
  }

  removePermissionFromGroup(
    groupId: string,
    permissionId: number
  ): Observable<any> {
    return this.http.delete(
      `api/security/group/${groupId}/permission/${permissionId}`,
      {}
    );
  }

  private notifyChanges() {
    this.dataUpdateEvent.next(true);
  }

  public getDataUpdateEvent(): Observable<boolean> {
    return this.dataUpdateEvent;
  }
}
