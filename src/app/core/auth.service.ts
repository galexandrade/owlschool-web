import { Injectable } from '@angular/core';

import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { PublicAccountService } from './public-account.service';
import { User } from '../model/user';

@Injectable()
export class AuthService {
  constructor(private accountService:PublicAccountService){}

  redirectUrl: string;

  jwtHelper: JwtHelper = new JwtHelper();

  loggedUser: User;

  getLoggedUser(): User {
    if(!tokenNotExpired()){
      this.loggedUser = null;
    } else if(this.loggedUser == null) {
      this.updateLoggedUser();
    }
    return this.loggedUser;
  }

  private updateLoggedUser() {
    let decoded: any = this.jwtHelper.decodeToken(localStorage.getItem('id_token'));
    this.loggedUser = new User();
    this.loggedUser.id = decoded.userId;
    this.loggedUser.email = decoded.email;
    this.loggedUser.schoolId = decoded.schoolId;
  }

  updateToken(token: string) {
    this.setToken(token);
    this.updateLoggedUser();
  }

  setToken(token: string) {
    localStorage.setItem('id_token', token);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  logout(): void {
    localStorage.removeItem('id_token');
  }

  login(username: string, password: string): Observable<string> {
    let obs:Observable<string> = this.accountService.authenticate(username, password);
    obs.subscribe(
      data => this.setToken(data),
      (errorData: any) => {
        console.error(errorData);
      }
    );
    return obs;
  }
}
