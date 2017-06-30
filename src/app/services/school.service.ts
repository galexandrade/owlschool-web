import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { ApiHttpService } from '../core/api-http.service';
import { School } from '../model/school';

@Injectable()
export class SchoolService{
    private resourcePath: string;

    constructor(private http: ApiHttpService) {
        this.resourcePath = 'schools';
    }

    create(school: School): Observable<any> {
    return this.http.post(this.resourcePath, school);
  }

  update(key: string, school: School): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.put(url, school);
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