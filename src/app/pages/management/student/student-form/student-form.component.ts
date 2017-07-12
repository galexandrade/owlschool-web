import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import { GlobalState } from '../../../../global.state';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../model/student';
import { Parent } from "../../../../model/parent";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  public form: FormGroup;
  private firstName: AbstractControl;
  private birthDay: AbstractControl;
  private classRoom: AbstractControl;

  private address: AbstractControl;
  private city: AbstractControl;
  private country: AbstractControl;
  private number: AbstractControl;
  private postalCode: AbstractControl;
  private state: AbstractControl;

  studentId: number;
  student: Student;
  parents: Parent[];


  constructor(private _state: GlobalState,
              private fb:FormBuilder,
              private studentService: StudentService,
              private toaster: ToasterService,
              private route: ActivatedRoute,
              private router: Router) {

    this.form = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'birthDay': ['', Validators.compose([Validators.required])],
      'classRoom': ['', Validators.compose([Validators.required])],
      'address': ['', Validators.compose([Validators.required])],
      'city': ['', Validators.compose([Validators.required])],
      'country': ['', Validators.compose([Validators.required])],
      'number': ['', Validators.compose([Validators.required])],
      'postalCode': ['', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])]
    });

    this.firstName = this.form.controls['firstName'];
    this.birthDay = this.form.controls['birthDay'];
    this.classRoom = this.form.controls['classRoom'];
    this.address = this.form.controls['address'];
    this.city = this.form.controls['city'];
    this.country = this.form.controls['country'];
    this.number = this.form.controls['number'];
    this.postalCode = this.form.controls['postalCode'];
    this.state = this.form.controls['state'];

    this.student = new Student();

    this.studentId = this.route.snapshot.params['id'];
    if(this.studentId) {
      this.studentService.get(this.studentId.toString()).subscribe(
        res => {
          this.student = res;
          this._state.updatePageName("general.menu.students", this.student.person.firstName);
          this.getParents();
        }
      );
    }
  }

  ngOnInit() {
    //this._state.updatePageName("general.menu.students");
  }

  onSubmit(values: Object): void{
    this.studentService.update(this.studentId.toString(), this.student).subscribe(
      (res: any) => this.toaster.pop({
                        type: 'success',
                        body: 'Updated with success!'
                    })
    );
  }

  getClassRoom(){
    this.studentService.getClassRoom(this.student).subscribe(
        res => {
          //this.student = res;
          console.info('CLASS ROOM', res);
          //this.getClassRoom();
        }
      );
  }

  getParents(){
    this.studentService.getParents(this.student).subscribe(
        res => {
          this.parents = res._embedded.parents;
          console.log(this.parents);
        }
      );
  }

  removeStudent(parent: Parent){
    let index = this.parents.indexOf(parent);
    if (index > -1) {
        this.parents.splice(index, 1);
    }
  }

}
