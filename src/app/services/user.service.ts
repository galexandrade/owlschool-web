import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserService {
  private _token: string;

  constructor(private router: Router, private http: Http) { }

  logOut(): void {
    this.router.navigate(['/login']);
  }

  logIn(email: string, password: string): void {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:8080/api/v1/public/auth', { 'email': email, 'password': password }, options)
      .map(res => res.text())
      .subscribe(
        data => this._token = data,
        err => console.log(err),
        () => console.log("Complete")
      );
    
    console.log(this._token);
  }
}
