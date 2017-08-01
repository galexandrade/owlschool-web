import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Location } from '@angular/common';

import { GlobalState } from '../../../../global.state';
import { StudentService } from '../../../../services/student.service';
import { ParentService } from "app/services/parent.service";
import { Student } from '../../../../model/student';
import { Parent } from "../../../../model/parent";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  private isEditing: boolean = false;

  public form: FormGroup;
  private firstName: AbstractControl;
  private lastName: AbstractControl;
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
  parents: Parent[] = [];
  parentsRemoved: Parent[] = [];


  constructor(private _state: GlobalState,
              private _location: Location,
              private fb:FormBuilder,
              private studentService: StudentService,
              private parentService: ParentService,
              private toaster: ToasterService,
              private route: ActivatedRoute,
              private router: Router) {

    if(route.snapshot.url[route.snapshot.url.length - 1].path === 'edit' || route.snapshot.url[route.snapshot.url.length - 1].path === 'new')
      this.isEditing = true;

    this.form = this.fb.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(15)])],
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
    this.lastName = this.form.controls['lastName'];
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
          this.student.parents = [];
          this._state.updatePageName("general.menu.students", this.student.person.firstName);
          this.getParents();
        }
      );
    }
    else{
      this.addParent();
    }
  }

  ngOnInit() {
    //this._state.updatePageName("general.menu.students");
  }

  onSubmit(values: Object): void{
    this.saveParents().subscribe(parentsSaved => {
      this.parents = parentsSaved;

      this.updateParents();
      if(this.studentId){
        this.studentService.patch(this.studentId.toString(), this.student).subscribe(
          (res: any) => {
            this.deleteParentsRemoved();
            this.toaster.pop({
                            type: 'success',
                            body: 'Updated with success!'
                        });
            //this.router.navigate(['../'], {relativeTo: this.route});
            this.goBack();
          }
        );
      }
      else{
        this.studentService.create(this.student).subscribe(
          (res: any) => {
            this.deleteParentsRemoved();
            this.toaster.pop({
                            type: 'success',
                            body: 'Updated with success!'
                        });
            this.goBack();
          }
        );
      }
    });

  }

  saveParents(): Observable<any[]>{
    let actions: any[] = [];
    this.parents.forEach(parent => {
      let id

      if(parent._links){
        let split = parent._links.self.href.split('/');
        id = split[split.length - 1];
      }

      if(id){
        actions.push(this.parentService.update(id, parent));
      }
      else{
        actions.push(this.parentService.create(parent));
      }
    });

    return Observable.forkJoin(actions);
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
          this.updateParents();
        }
      );
  }

  removeParent(parent: Parent){
    this.verifyParentDelete(parent);

    let index = this.parents.indexOf(parent);
    if (index > -1) {
        this.parents.splice(index, 1);
    }
  }

  verifyParentDelete(parent: Parent){
    let split = parent._links.self.href.split('/');
    let id = split[split.length - 1];
    this.parentService.get(id + '/students').subscribe(
      res => {
          if(res._embedded.students.length === 1){
            this.parentsRemoved.push(parent);
          }
      }
    );
  }

  deleteParentsRemoved(){
    this.parentsRemoved.forEach(parent => {
      let split = parent._links.self.href.split('/');
      let id = split[split.length - 1];

      this.parentService.delete(id).subscribe(
        res => {
            this.toaster.pop({
                    type: 'success',
                    body: 'Deleted parent with success!'
                })
        }
      );
    });
  }

  addParent(){
    this.parents.push(new Parent());
    window.scrollTo(0,document.body.scrollHeight);
    return false;
  }

  updateParents(){
    this.student.parents = [];
    this.parents.forEach(parent => {
      this.student.parents.push(parent._links.self.href);
    });
  }

  goBack(){
    this._location.back();
  }

}
