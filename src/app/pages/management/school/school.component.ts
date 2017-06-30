import { Component, OnInit } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../model/school';

@Component({
  selector: 'school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {

  public form:FormGroup;

  private name: AbstractControl;
  private companyRegister: AbstractControl;

  private school: School;

  constructor(fb:FormBuilder, schoolService: SchoolService) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'companyRegister': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });

    this.name = this.form.controls['name'];
    this.companyRegister = this.form.controls['companyRegister'];

    let id = '1';
    schoolService.get(id).subscribe(
      res => {console.log(res), this.school = res}
    );
   }

  ngOnInit() {
  }

  onSubmit(values: Object): void{

    console.log("Submit");
    console.log(this.name.value);
  }

}
