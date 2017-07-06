import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { GlobalState } from '../../../../global.state';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../model/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  public form:FormGroup;
  private firstName: AbstractControl;

  student: Student;


  constructor(private _state: GlobalState,
              private fb:FormBuilder,
              private studentService: StudentService,
              private toaster: ToasterService,
              private route: ActivatedRoute,
              private router: Router) {

    this.form = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(15)])]
    });

    this.firstName = this.form.controls['firstName'];

    this.student = new Student();

    let id = this.route.snapshot.params['id'];
    if(id) {
      this.studentService.get(id).subscribe(
        res => {this.student = res; console.log(this.student);}
      );
    }
  }

  ngOnInit() {

  }

  onSubmit(values: Object): void{}

}
