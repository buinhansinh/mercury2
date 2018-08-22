import { Injectable } from '@angular/core';
import { Group } from './group.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GroupService {
  private dataUpdateEvent: Subject<boolean> = new Subject();
  constructor(private http: HttpClient) {}

  getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(`api/security/Group/${id}`);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`api/security/Group/`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`api/security/Group/`, group).pipe(tap(() =>  this.notifyChanges()));
  }

  deleteGroup(group: Group): Observable<Group> {
    return this.http.delete<Group>(`api/security/Group/${group.id}`).pipe(tap(() => this.notifyChanges()));
  }

  existGroup(name: string): Observable<boolean> {
    return this.http.get<boolean>(`api/security/Group/exists/${name}`);
  }

  private notifyChanges(){
    this.dataUpdateEvent.next(true);
  }

  public getDataUpdateEvent(): Observable<boolean>{
    return this.dataUpdateEvent;
  }
}
