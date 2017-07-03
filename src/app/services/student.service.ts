import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { ApiHttpService } from '../core/api-http.service';
import { Student } from '../model/student';

@Injectable()
export class StudentService{
    private resourcePath: string;

    constructor(private http: ApiHttpService) {
        this.resourcePath = 'students';
    }

    create(student: Student): Observable<any> {
      return this.http.post(this.resourcePath, student);
    }

  update(key: string, student: Student): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.put(url, student);
  }

  get(path?: string, params?: any): Observable<any> {
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url, params);
  }

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }

}