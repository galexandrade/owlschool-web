import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { ApiHttpService } from '../core/api-http.service';
import { Parent } from '../model/parent';

@Injectable()
export class ParentService{
  private resourcePath: string;

  constructor(private http: ApiHttpService) {
      this.resourcePath = 'parents';
  }

  create(parent: Parent): Observable<any> {
    return this.http.post(this.resourcePath, parent);
  }

  update(key: string, parent: Parent): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.put(url, parent);
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