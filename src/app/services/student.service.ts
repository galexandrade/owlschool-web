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

  patch(key: string, student: Student): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.patch(url, student);
  }

  get(path?: string, params?: any): Observable<any> {
    let url: string = this.resourcePath + (path ? '/' + path : '');
    return this.http.get(url, params);
  }

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }

  getClassRoom(student: Student): Observable<any> {
    let url: string = student._links.classRoom.href;
    return this.http.get(url);
  }

  getParents(student: Student): Observable<any> {
    let url: string = student._links.parents.href;
    return this.http.get(url);
  }

  search(terms: Observable<string>){
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.get('search/findByName', {'name': term})
        .map(res => res._embedded.students);
  }

}