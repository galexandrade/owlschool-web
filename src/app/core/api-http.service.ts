import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class ApiHttpService {

  private url: string;

  constructor(private http: AuthHttp,
              private toaster: ToasterService) {
    this.url = environment.apiUrl;
  }

  post(resourcePath: string, data: any): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.post(url, data)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  put(resourcePath: string, data: any): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.put(url, data)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  patch(resourcePath: string, data: any): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.patch(url, data)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  get(resourcePath: string, params?: any): Observable<any> {
    let url : string = resourcePath.substr(0, 4) === 'http' ? resourcePath : this.url + '/' + resourcePath;
    if(params) {
      url += '?';
      let arr: string[] = [];
      for(let attr in params) {
        if(params[attr] != null)
          arr.push(attr + '=' + params[attr]);
      }
      url += arr.join('&');
    }
    return this.http.get(url)
      .map(res => this.decodeSuccess(res))
      .catch((error: any) => Observable.throw(this.decodeError(error.json())))
      .publishLast()
      .refCount();
  }

  delete(resourcePath: string): Observable<any> {
    let url : string = this.url + '/' + resourcePath;
    return this.http.delete(url)
      .map(res => res /*this.decodeSuccess(res)*/)
      .catch((error: any) => Observable.throw(this.decodeError(error /*.json()*/)))
      .publishLast()
      .refCount();
  }

  decodeSuccess(data: any): any {
    if(data == '')
      this.toaster.pop({
          type: 'success',
          body: 'Success'
      });
    else{
      data = data.json();
      if(data.status && data.message) {
        this.toaster.pop({
            type: 'success',
            body: data.message
        });
      }
    }
    return data;
  }

  decodeError(data: any): any {
    if(data.code && data.status && data.message) {
      this.toaster.pop({
          type: 'error',
          body: data.message
      });
      return data;
    } else {
      let message: string = data.error || "Ops! Tem alguma coisa errada.";
      this.toaster.pop({
          type: 'error',
          body: message
      });
      return message;
    }
  }
}
