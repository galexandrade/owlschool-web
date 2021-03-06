import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { ApiHttpService } from '../core/api-http.service';
import { Staff } from '../model/staff';

@Injectable()
export class MatterService{
    private resourcePath: string;

    constructor(private http: ApiHttpService) {
        this.resourcePath = 'matters';
    }

    create(staff: Staff): Observable<any> {
      return this.http.post(this.resourcePath, staff);
    }

  update(key: string, staff: Staff): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.put(url, staff);
  }

  patch(key: string, staff: Staff): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.patch(url, staff);
  }

  get(path?: string, params?: any): Observable<any> {
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url, params);
  }

  getTeachedMatters() {
    return this.get('search/getTeachedMatters')
        .map(res => res._embedded.matters);
  }

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }
}