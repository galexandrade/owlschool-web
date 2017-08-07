import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { ApiHttpService } from '../core/api-http.service';
import { ClassRoom } from '../model/classRoom';

@Injectable()
export class ClassRoomService{
  private resourcePath: string;

  constructor(private http: ApiHttpService) {
      this.resourcePath = 'classRooms';
  }

  create(classRoom: ClassRoom): Observable<any> {
    return this.http.post(this.resourcePath, classRoom);
  }

  update(key: string, classRoom: ClassRoom): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.put(url, classRoom);
  }

  patch(key: string, classRoom: ClassRoom): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.patch(url, classRoom);
  }

  get(path?: string, params?: any): Observable<any> {
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url, params);
  }

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }

  getMainTeacher(classRoom: ClassRoom): Observable<any> {
    let url: string = classRoom._links.mainTeacher.href;
    return this.http.get(url);
  }

  getStudents(classRoom: ClassRoom): Observable<any> {
    let path = classRoom.id + '/students';
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url);
  }
}