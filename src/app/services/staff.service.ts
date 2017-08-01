import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { ApiHttpService } from '../core/api-http.service';
import { Staff } from '../model/staff';
import { Matter } from "app/model/matter";

@Injectable()
export class StaffService{
    private resourcePath: string;

    constructor(private http: ApiHttpService) {
        this.resourcePath = 'staffs';
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

  delete(key: string): Observable<any> {
    let url: string = this.resourcePath + '/' + key;
    return this.http.delete(url);
  }

  getMatters(staff: Staff): Observable<any> {
    let url: string = staff._links.matters.href;
    return this.http.get(url);
  }

  getTeachers() {
    return this.get('search/findByFunction', {'function': 'teacher'})
        .map(res => res._embedded.staffs);
  }

  findTeacherByMatter(matter: Matter) {
    let split = matter._links.self.href.split('/');
    let id = split[split.length - 1];
    return this.get('search/findTeacherByMatter', {'matterId': id})
        .map(res => res._embedded.staffs);
  }

  searchTeacher(terms: Observable<string>){
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchTeacherEntries(term));
  }

  searchTeacherEntries(term) {
    return this.get('search/findTeacherByName', {'name': term})
        .map(res => res._embedded.staffs);
  }
}