import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public submitted: boolean = false;

  constructor(private router: Router, fb:FormBuilder, private authService: AuthService) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values: Object): void {
    this.submitted = true;
    if (this.form.valid) {
      this.authService.login(this.email.value, this.password.value).subscribe((data) => {
        if(this.authService.loggedIn()){
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/pages';
          this.router.navigate([redirect]);
        }
      });
    }
  }
}
