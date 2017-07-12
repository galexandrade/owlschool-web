import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import {GlobalState} from '../../../global.state';

import { SchoolService } from '../../../services/school.service';
import { AuthService } from '../../../core/auth.service';
import { School } from '../../../model/school';

@Component({
  selector: 'school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  private school: School;

  public form:FormGroup;
  private name: AbstractControl;
  private companyRegistration: AbstractControl;
  private address: AbstractControl;
  private city: AbstractControl;
  private country: AbstractControl;
  private number: AbstractControl;
  private postalCode: AbstractControl;
  private state: AbstractControl;
  private email: AbstractControl;
  private phone: AbstractControl;
  private website: AbstractControl;


  constructor(private _state:GlobalState,
              private fb:FormBuilder,
              private schoolService: SchoolService,
              private authService: AuthService,
              private toaster: ToasterService) {

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'companyRegistration': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'number': ['', Validators.compose([Validators.required])],
      'postalCode': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'phone': ['', Validators.compose([Validators.required])],
      'website': ['', Validators.compose([])]
    });

    this.name = this.form.controls['name'];
    this.companyRegistration = this.form.controls['companyRegistration'];
    this.address = this.form.controls['address'];
    this.city = this.form.controls['city'];
    this.country = this.form.controls['country'];
    this.number = this.form.controls['number'];
    this.postalCode = this.form.controls['postalCode'];
    this.state = this.form.controls['state'];
    this.email = this.form.controls['email'];
    this.phone = this.form.controls['phone'];
    this.website = this.form.controls['website'];

    this.schoolService.get(authService.getLoggedUser().schoolId.toString()).subscribe(
      res => this.school = res
    );
   }

  ngOnInit() {
    this._state.updatePageName("general.menu.school");
  }

  onSubmit(values: Object): void{
    this.schoolService.update(this.authService.getLoggedUser().schoolId.toString(), this.school).subscribe(
      (res: any) => this.toaster.pop({
                        type: 'success',
                        body: 'Updated with success!'
                    })
    );
  }
}
