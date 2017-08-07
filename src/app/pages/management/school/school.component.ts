import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';
import {GlobalState} from '../../../global.state';
import { Location } from '@angular/common';

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


  constructor(private _state:GlobalState,
              private _location: Location,
              private schoolService: SchoolService,
              private authService: AuthService,
              private toaster: ToasterService) {

    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(15)]),
      'companyRegistration': new FormControl('', [Validators.required]),
      'address': new FormGroup({
        'address': new FormControl('', [Validators.required]),
        'city': new FormControl('', [Validators.required]),
        'country': new FormControl('', [Validators.required]),
        'number': new FormControl('', [Validators.required]),
        'postalCode': new FormControl('', [Validators.required]),
        'state': new FormControl('', [Validators.required])
      }),
      'contact': new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'phone': new FormControl('', [Validators.required]),
        'website': new FormControl('', [])
      })
    });

    this.schoolService.get(authService.getLoggedUser().schoolId.toString()).subscribe(
      res => this.school = res
    );
   }

  ngOnInit() {
    this._state.updatePageName("general.menu.school");
  }

  onSubmit(values: Object): void{
    this.schoolService.update(this.authService.getLoggedUser().schoolId.toString(), this.form.value).subscribe(
      (res: any) => this.toaster.pop({
                        type: 'success',
                        body: 'Updated with success!'
                    })
    );
  }

  goBack(){
    this._location.back();
  }
}
